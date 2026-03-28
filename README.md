# DineAnalytics: Uncovering Success Patterns in the Global Restaurant Market

This project performs a comprehensive data analysis on a restaurant dataset to extract meaningful insights using Python, Pandas, Matplotlib, and Seaborn.

## 📂 Project Structure

- **Dataset  (1).csv**: The raw restaurant dataset.
- **analysis.py**: Main Python script containing all data cleaning, analysis, and visualization logic.
- **report.md**: Detailed project report summarizing the findings.
- **README.md**: This file, explaining the project.
- **Visualizations**:
  - `price_range_distribution.png`: Bar chart showing price range counts.
  - `geographical_distribution.png`: Scatter plot of restaurant locations.
  - `votes_vs_rating.png`: Correlation between votes and ratings.
  - `price_vs_services.png`: Relationship between price range and services.

## 🚀 How to Run

1.  **Install Dependencies:**
    ```bash
    pip install pandas matplotlib seaborn numpy
    ```

2.  **Run the Analysis:**
    ```bash
    python analysis.py
    ```

3.  **View the Results:**
    Check the generated PNG files for visualizations and the console output for statistical summaries.

## 📊 Key Findings

- **Top Cuisines:** North Indian, Chinese, and Fast Food dominate the market.
- **City Analysis:** New Delhi has the highest restaurant count, but smaller cities like Inner City show higher average ratings.
- **Price vs Services:** Premium restaurants (Price Range 4) focus more on table booking, while mid-range restaurants (Price Range 2) excel in online delivery.
- **Impact of Services:** Restaurants with online delivery have a significantly higher average rating (3.25) compared to those without (2.47).

## 🛠️ Tools Used
- **Language:** Python
- **Libraries:** Pandas, NumPy, Matplotlib, Seaborn
- **Environment:** VS Code
