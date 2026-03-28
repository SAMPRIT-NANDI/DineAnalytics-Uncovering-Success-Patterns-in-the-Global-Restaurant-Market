import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Set style for visualizations
sns.set(style="whitegrid")

# 1. Load the dataset
df = pd.read_csv('Dataset  (1).csv')

# 2. Basic Data Exploration & Cleaning
print("Dataset Shape:", df.shape)
print("\nMissing Values:\n", df.isnull().sum())

# Handling missing values in Cuisines (filling with 'Unknown')
df['Cuisines'] = df['Cuisines'].fillna('Unknown')

# --- Level 1: Basic Data Analysis ---

# 1.1 Top Cuisines Analysis
# Split cuisines and count occurrences
cuisines_series = df['Cuisines'].str.split(', ')
all_cuisines = [cuisine for sublist in cuisines_series for cuisine in sublist]
cuisine_counts = pd.Series(all_cuisines).value_counts()

top_3_cuisines = cuisine_counts.head(3)
total_restaurants = len(df)
percentage_top_3 = (top_3_cuisines / total_restaurants) * 100

print("\n--- Level 1: Top Cuisines Analysis ---")
print("Top 3 Cuisines:\n", top_3_cuisines)
print("\nPercentage of restaurants serving these cuisines:\n", percentage_top_3)

# 1.2 City-Based Analysis
city_counts = df['City'].value_counts()
highest_restaurant_city = city_counts.idxmax()
avg_rating_per_city = df.groupby('City')['Aggregate rating'].mean()
highest_avg_rating_city = avg_rating_per_city.idxmax()

print("\n--- Level 1: City-Based Analysis ---")
print(f"City with the highest number of restaurants: {highest_restaurant_city} ({city_counts.max()})")
print(f"City with the highest average rating: {highest_avg_rating_city} ({avg_rating_per_city.max():.2f})")

# 1.3 Price Range Distribution
price_range_dist = df['Price range'].value_counts(normalize=True) * 100

plt.figure(figsize=(8, 5))
sns.countplot(data=df, x='Price range', palette='viridis')
plt.title('Distribution of Price Ranges')
plt.xlabel('Price Range')
plt.ylabel('Count')
plt.savefig('price_range_distribution.png')
# plt.show() # Not showing in terminal

print("\n--- Level 1: Price Range Distribution ---")
print("Percentage distribution of restaurants across price categories:\n", price_range_dist)

# 1.4 Online Delivery Analysis
online_delivery_perc = (df['Has Online delivery'].value_counts(normalize=True) * 100).get('Yes', 0)
avg_rating_delivery = df.groupby('Has Online delivery')['Aggregate rating'].mean()

print("\n--- Level 1: Online Delivery Analysis ---")
print(f"Percentage of restaurants offering online delivery: {online_delivery_perc:.2f}%")
print("Average ratings comparison:\n", avg_rating_delivery)

# --- Level 2: Intermediate Data Analysis ---

# 2.1 Cuisine Combination Analysis
common_combinations = df['Cuisines'].value_counts().head(10)
# Analyze ratings for top combinations
top_combos = common_combinations.index
avg_rating_combos = df[df['Cuisines'].isin(top_combos)].groupby('Cuisines')['Aggregate rating'].mean().sort_values(ascending=False)

print("\n--- Level 2: Cuisine Combination Analysis ---")
print("Top 10 Most Common Cuisine Combinations:\n", common_combinations)
print("\nAverage Ratings for these combinations:\n", avg_rating_combos)

# 2.2 Geographical Analysis (Pattern Identification)
plt.figure(figsize=(10, 6))
sns.scatterplot(data=df, x='Longitude', y='Latitude', alpha=0.5, hue='Price range', palette='Set1')
plt.title('Restaurant Geographical Distribution')
plt.savefig('geographical_distribution.png')

# 2.3 Restaurant Chain Analysis
chain_counts = df['Restaurant Name'].value_counts()
chains = chain_counts[chain_counts > 1]
chain_data = df[df['Restaurant Name'].isin(chains.index)]
chain_stats = chain_data.groupby('Restaurant Name').agg({'Aggregate rating': 'mean', 'Votes': 'sum'}).sort_values(by='Votes', ascending=False)

print("\n--- Level 2: Restaurant Chain Analysis ---")
print(f"Number of restaurant chains detected: {len(chains)}")
print("Top 5 Chains by popularity (Votes):\n", chain_stats.head(5))

# --- Level 3: Advanced Analysis ---

# 3.1 Votes vs Ratings
highest_votes = df.loc[df['Votes'].idxmax()]
lowest_votes = df.loc[df['Votes'].idxmin()]
correlation = df['Votes'].corr(df['Aggregate rating'])

print("\n--- Level 3: Votes vs Ratings ---")
print(f"Restaurant with highest votes: {highest_votes['Restaurant Name']} ({highest_votes['Votes']})")
print(f"Restaurant with lowest votes: {lowest_votes['Restaurant Name']} ({lowest_votes['Votes']})")
print(f"Correlation between Votes and Aggregate Rating: {correlation:.4f}")

plt.figure(figsize=(8, 5))
sns.scatterplot(data=df, x='Votes', y='Aggregate rating', alpha=0.3)
plt.title('Votes vs Aggregate Rating')
plt.savefig('votes_vs_rating.png')

# 3.2 Price vs Services
# Table booking and Online delivery vs Price Range
df['Has Table booking bin'] = df['Has Table booking'].map({'Yes': 1, 'No': 0})
df['Has Online delivery bin'] = df['Has Online delivery'].map({'Yes': 1, 'No': 0})

price_services = df.groupby('Price range')[['Has Table booking bin', 'Has Online delivery bin']].mean() * 100

print("\n--- Level 3: Price vs Services ---")
print("Percentage of services availability by Price Range:\n", price_services)

plt.figure(figsize=(10, 6))
price_services.plot(kind='bar', stacked=False)
plt.title('Services Availability by Price Range')
plt.ylabel('Percentage (%)')
plt.xticks(rotation=0)
plt.savefig('price_vs_services.png')

print("\nAnalysis complete. Visualizations saved as PNG files.")
