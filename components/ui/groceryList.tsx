import { ShoppingListItem } from '@/db/types/database_types';

interface GroceryListProps {
    shoppingList: ShoppingListItem[];
}

export const GroceryList: React.FC<GroceryListProps> = ({ shoppingList }) => {
    return (
        <div>
            <h4>Grocery List</h4>
            
            {shoppingList.map((item, index) => (
                <div key={index}>
                    <p>{item.ingredient.name}: {item.totalQuantity} {item.ingredient.unit}</p>
                </div>
            ))}
        </div>
    );
};