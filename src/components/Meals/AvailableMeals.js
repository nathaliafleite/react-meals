import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [mealsList, setMealsList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async function () {
            try {
                const response = await fetch(
                    "https://reactcourse-http-default-rtdb.firebaseio.com/meals.json"
                );
                if (!response.ok) throw new Error("Something went wrong");

                const data = await response.json();

                const meals = [];

                for (const key in data) {
                    meals.push({
                        id: key,
                        name: data[key].name,
                        description: data[key].description,
                        price: data[key].price,
                    });
                }

                setMealsList(meals);
            } catch (err) {
                setError(err.message);
            }

            setIsLoading(false);
        };

        fetchMeals();
    }, []);

    let content = <p>No meals found</p>;

    if(mealsList.length > 0) {
        content = mealsList.map(meal => (
            <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.desctiption}
                price={meal.price}
            />
        ));
    }

    if(error) content = <p>{error}</p>

    if(isLoading) content = <p>Loading meals...</p>

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{content}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
