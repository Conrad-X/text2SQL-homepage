// Mobile Navigation
function showMenu() {
    const navLinks = document.getElementById("navLinks")
    navLinks.style.right = "0"
  }
  
  function hideMenu() {
    const navLinks = document.getElementById("navLinks")
    navLinks.style.right = "-200px"
  }
  
  // Demo functionality
  document.addEventListener("DOMContentLoaded", () => {
    const convertBtn = document.getElementById("convertBtn")
    const copyBtn = document.getElementById("copyBtn")
    const nlQuery = document.getElementById("nlQuery")
    const sqlOutput = document.getElementById("sqlOutput")
  
    // Sample queries and their SQL equivalents for demo purposes
    const sampleQueries = {
      "Show me all customers who made a purchase last month": `SELECT c.customer_id, c.first_name, c.last_name, c.email
  FROM customers c
  JOIN orders o ON c.customer_id = o.customer_id
  WHERE o.order_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) 
  AND CURRENT_DATE()
  GROUP BY c.customer_id;`,
  
      "Find the top 5 products by sales": `SELECT p.product_id, p.product_name, SUM(oi.quantity * oi.unit_price) as total_sales
  FROM products p
  JOIN order_items oi ON p.product_id = oi.product_id
  GROUP BY p.product_id
  ORDER BY total_sales DESC
  LIMIT 5;`,
  
      "What is the average order value by month in 2024?": `SELECT 
      MONTH(order_date) as month,
      ROUND(AVG(total_amount), 2) as average_order_value
  FROM orders
  WHERE YEAR(order_date) = 2024
  GROUP BY MONTH(order_date)
  ORDER BY month;`,
  
      "List all customers who haven't made a purchase in the last 6 months": `SELECT c.customer_id, c.first_name, c.last_name, c.email, MAX(o.order_date) as last_order_date
  FROM customers c
  LEFT JOIN orders o ON c.customer_id = o.customer_id
  GROUP BY c.customer_id
  HAVING last_order_date < DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH) OR last_order_date IS NULL
  ORDER BY last_order_date DESC;`,
    }
  
    // Add more sample queries
    const moreSamples = {
      "Show revenue by category": `SELECT 
      c.category_name,
      SUM(oi.quantity * oi.unit_price) as revenue
  FROM categories c
  JOIN products p ON c.category_id = p.category_id
  JOIN order_items oi ON p.product_id = oi.product_id
  GROUP BY c.category_id
  ORDER BY revenue DESC;`,
  
      "Find customers who spent more than $1000": `SELECT 
      c.customer_id, 
      c.first_name, 
      c.last_name, 
      SUM(o.total_amount) as total_spent
  FROM customers c
  JOIN orders o ON c.customer_id = o.customer_id
  GROUP BY c.customer_id
  HAVING total_spent > 1000
  ORDER BY total_spent DESC;`,
    }
  
    // Combine all samples
    Object.assign(sampleQueries, moreSamples)
  
    // Convert button click handler
    convertBtn.addEventListener("click", () => {
      const query = nlQuery.value.trim()
  
      if (!query) {
        sqlOutput.textContent = "-- Please enter a question"
        return
      }
  
      // Show loading state
      sqlOutput.textContent = "Generating SQL..."
  
      // Simulate processing delay
      setTimeout(() => {
        if (sampleQueries[query]) {
          sqlOutput.textContent = sampleQueries[query]
        } else {
          // Generate a generic SQL query for demo purposes
          const tables = ["customers", "orders", "products", "categories"]
          const randomTable = tables[Math.floor(Math.random() * tables.length)]
  
          sqlOutput.textContent = `-- Generated SQL for: "${query}"\n\nSELECT *\nFROM ${randomTable}\nLIMIT 10;\n\n-- Note: This is a demo. In the actual product,\n-- the AI would generate a precise SQL query\n-- based on your database schema.`
        }
      }, 1000)
    })
  
    // Copy button click handler
    copyBtn.addEventListener("click", () => {
      const sqlText = sqlOutput.textContent
      navigator.clipboard.writeText(sqlText).then(() => {
        const originalText = copyBtn.textContent
        copyBtn.textContent = "Copied!"
  
        setTimeout(() => {
          copyBtn.textContent = originalText
        }, 2000)
      })
    })
  
    // Add example query on placeholder click
    nlQuery.addEventListener("focus", () => {
      if (!nlQuery.value) {
        const examples = Object.keys(sampleQueries)
        const randomExample = examples[Math.floor(Math.random() * examples.length)]
        nlQuery.placeholder = `Example: ${randomExample}`
      }
    })
  })
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
  
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)
  
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        })
  
        // Hide mobile menu if open
        const navLinks = document.getElementById("navLinks")
        if (navLinks.style.right === "0px") {
          hideMenu()
        }
      }
    })
  })
  
  