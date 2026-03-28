import pandas as pd
import json
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

def process_data_with_ml():
    df = pd.read_csv('Dataset  (1).csv')
    
    # Basic Cleaning
    df['Cuisines'] = df['Cuisines'].fillna('Unknown')
    
    # --- Machine Learning: Rating Prediction ---
    # Prepare data for ML
    ml_df = df.copy()
    
    # Encode categorical variables
    le_city = LabelEncoder()
    le_delivery = LabelEncoder()
    le_booking = LabelEncoder()
    
    ml_df['City_Code'] = le_city.fit_transform(ml_df['City'])
    ml_df['Delivery_Code'] = le_delivery.fit_transform(ml_df['Has Online delivery'])
    ml_df['Booking_Code'] = le_booking.fit_transform(ml_df['Has Table booking'])
    
    # Features: Price range, Votes, Average Cost, Delivery, Booking
    features = ['Price range', 'Votes', 'Average Cost for two', 'Delivery_Code', 'Booking_Code']
    X = ml_df[features]
    y = ml_df['Aggregate rating']
    
    # Split and Train
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    predictions = model.predict(X_test)
    r2 = r2_score(y_test, predictions)
    mse = mean_squared_error(y_test, predictions)
    
    # Feature Importance
    importances = model.feature_importances_
    feature_importance_data = [{"feature": f, "importance": round(i * 100, 2)} for f, i in zip(features, importances)]

    # --- Standard Dashboard Data ---
    stats = {
        "totalRestaurants": len(df),
        "avgRating": round(df['Aggregate rating'].mean(), 2),
        "totalVotes": int(df['Votes'].sum()),
        "avgCostForTwo": round(df['Average Cost for two'].mean(), 2)
    }
    
    cuisines_series = df['Cuisines'].str.split(', ')
    all_cuisines = [cuisine for sublist in cuisines_series for cuisine in sublist]
    top_cuisines = pd.Series(all_cuisines).value_counts().head(10).to_dict()
    
    price_dist = df['Price range'].value_counts().sort_index().to_dict()
    top_cities = df.groupby('City')['Aggregate rating'].mean().sort_values(ascending=False).head(10).to_dict()
    delivery_rating = df.groupby('Has Online delivery')['Aggregate rating'].mean().to_dict()
    
    sample_data = df.head(100)[['Restaurant Name', 'City', 'Cuisines', 'Aggregate rating', 'Votes', 'Price range']].to_dict(orient='records')

    # Combined Data with ML Insights
    dashboard_data = {
        "stats": stats,
        "mlInsights": {
            "modelName": "Random Forest Regressor",
            "accuracy_r2": round(r2, 4),
            "error_mse": round(mse, 4),
            "featureImportance": feature_importance_data,
            "predictionNote": "Our model predicts restaurant ratings with " + str(round(r2*100, 1)) + "% variance explained based on features like votes, price, and services."
        },
        "topCuisines": [{"name": k, "value": v} for k, v in top_cuisines.items()],
        "priceDistribution": [{"range": str(k), "count": v} for k, v in price_dist.items()],
        "topCities": [{"city": k, "rating": round(v, 2)} for k, v in top_cities.items()],
        "deliveryImpact": [{"delivery": k, "rating": round(v, 2)} for k, v in delivery_rating.items()],
        "restaurants": sample_data
    }

    # Save to JSON for the frontend
    if not os.path.exists('dashboard/public'):
        os.makedirs('dashboard/public')
        
    with open('dashboard/public/dashboard-data.json', 'w') as f:
        json.dump(dashboard_data, f, indent=2)
    
    print("Data with ML Insights processed and saved to dashboard/public/dashboard-data.json")

if __name__ == "__main__":
    process_data_with_ml()
