import pandas as pd
import json
import os

def process_data():
    df = pd.read_csv('Dataset  (1).csv')
    
    # Basic Cleaning
    df['Cuisines'] = df['Cuisines'].fillna('Unknown')
    
    # 1. Stats Summary
    stats = {
        "totalRestaurants": len(df),
        "avgRating": round(df['Aggregate rating'].mean(), 2),
        "totalVotes": int(df['Votes'].sum()),
        "avgCostForTwo": round(df['Average Cost for two'].mean(), 2)
    }
    
    # 2. Top Cuisines
    cuisines_series = df['Cuisines'].str.split(', ')
    all_cuisines = [cuisine for sublist in cuisines_series for cuisine in sublist]
    top_cuisines = pd.Series(all_cuisines).value_counts().head(10).to_dict()
    
    # 3. Price Range Distribution
    price_dist = df['Price range'].value_counts().sort_index().to_dict()
    
    # 4. Top Cities by Rating
    top_cities = df.groupby('City')['Aggregate rating'].mean().sort_values(ascending=False).head(10).to_dict()
    
    # 5. Online Delivery vs Rating
    delivery_rating = df.groupby('Has Online delivery')['Aggregate rating'].mean().to_dict()
    
    # 6. Sample Data for Table (top 50)
    sample_data = df.head(100)[['Restaurant Name', 'City', 'Cuisines', 'Aggregate rating', 'Votes', 'Price range']].to_dict(orient='records')

    # Combined Data
    dashboard_data = {
        "stats": stats,
        "topCuisines": [{"name": k, "value": v} for k, v in top_cuisines.items()],
        "priceDistribution": [{"range": str(k), "count": v} for k, v in price_dist.items()],
        "topCities": [{"city": k, "rating": round(v, 2)} for k, v in top_cities.items()],
        "deliveryImpact": [{"delivery": k, "rating": round(v, 2)} for k, v in delivery_rating.items()],
        "restaurants": sample_data
    }

    # Save to JSON for the frontend
    # We will create a public folder for Next.js
    if not os.path.exists('public'):
        os.makedirs('public')
        
    with open('public/dashboard-data.json', 'w') as f:
        json.dump(dashboard_data, f, indent=2)
    
    print("Data processed and saved to public/dashboard-data.json")

if __name__ == "__main__":
    process_data()
