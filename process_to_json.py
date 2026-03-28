import pandas as pd
import json
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

def process_data_comprehensive():
    df = pd.read_csv('Dataset  (1).csv')
    df['Cuisines'] = df['Cuisines'].fillna('Unknown')
    
    # --- Machine Learning: Rating Prediction ---
    ml_df = df.copy()
    le_city, le_delivery, le_booking = LabelEncoder(), LabelEncoder(), LabelEncoder()
    ml_df['City_Code'] = le_city.fit_transform(ml_df['City'])
    ml_df['Delivery_Code'] = le_delivery.fit_transform(ml_df['Has Online delivery'])
    ml_df['Booking_Code'] = le_booking.fit_transform(ml_df['Has Table booking'])
    
    features = ['Price range', 'Votes', 'Average Cost for two', 'Delivery_Code', 'Booking_Code']
    X, y = ml_df[features], ml_df['Aggregate rating']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    predictions = model.predict(X_test)
    r2, mse = r2_score(y_test, predictions), mean_squared_error(y_test, predictions)
    importances = model.feature_importances_
    feature_importance_data = [{"feature": f, "importance": round(i * 100, 2)} for f, i in zip(features, importances)]

    # --- City-Specific Granular Data ---
    cities_data = {}
    for city in df['City'].unique():
        city_df = df[df['City'] == city]
        
        # City stats
        city_stats = {
            "count": len(city_df),
            "avgRating": round(city_df['Aggregate rating'].mean(), 2),
            "avgCost": round(city_df['Average Cost for two'].mean(), 2),
            "topCuisine": city_df['Cuisines'].str.split(', ').explode().mode()[0] if not city_df.empty else "N/A"
        }
        
        # City charts
        cuisines_dist = city_df['Cuisines'].str.split(', ').explode().value_counts().head(5).to_dict()
        price_dist = city_df['Price range'].value_counts().sort_index().to_dict()
        
        cities_data[city] = {
            "stats": city_stats,
            "cuisines": [{"name": k, "value": v} for k, v in cuisines_dist.items()],
            "priceRange": [{"range": str(k), "count": v} for k, v in price_dist.items()],
            "restaurants": city_df.head(10)[['Restaurant Name', 'Aggregate rating', 'Votes', 'Price range']].to_dict(orient='records')
        }

    # --- Global Stats & Overall Charts ---
    stats = {
        "totalRestaurants": len(df),
        "avgRating": round(df['Aggregate rating'].mean(), 2),
        "totalVotes": int(df['Votes'].sum()),
        "avgCostForTwo": round(df['Average Cost for two'].mean(), 2)
    }
    
    global_cuisines = df['Cuisines'].str.split(', ').explode().value_counts().head(10).to_dict()
    global_cities = df.groupby('City')['Aggregate rating'].mean().sort_values(ascending=False).head(10).to_dict()

    dashboard_data = {
        "stats": stats,
        "mlInsights": {
            "modelName": "Random Forest Regressor",
            "accuracy_r2": round(r2, 4),
            "error_mse": round(mse, 4),
            "featureImportance": feature_importance_data,
            "predictionNote": f"Predicts ratings with {round(r2*100, 1)}% variance based on restaurant features."
        },
        "topCuisines": [{"name": k, "value": v} for k, v in global_cuisines.items()],
        "topCities": [{"city": k, "rating": round(v, 2)} for k, v in global_cities.items()],
        "cities": cities_data,
        "allCities": sorted(df['City'].unique().tolist())
    }

    if not os.path.exists('dashboard/public'):
        os.makedirs('dashboard/public')
        
    with open('dashboard/public/dashboard-data.json', 'w') as f:
        json.dump(dashboard_data, f, indent=2)
    
    print("Comprehensive data with City-specific insights processed!")

if __name__ == "__main__":
    process_data_comprehensive()
