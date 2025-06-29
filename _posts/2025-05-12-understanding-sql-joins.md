# Understanding SQL JOINs
When working with relational databases, data is often broken down into different tables, each focusing on a specific type of information. These tables are connected through relationships, making it easier to organize and manage large datasets. To pull data from these tables and make sense of it, we use SQL, the language that allows us to query, update, and combine information across multiple tables.

In this post, we'll look at the basics of SQL JOINs ,what they are, how they work, and which ones you might want to use in different situations.

## What is a JOIN in SQL?
A JOIN in SQL is used to combine columns from two or more related tables into a single result. This allows you to query and retrieve meaningful data that’s been spread across the different tables.

Since JOINs work across multiple tables, they are slightly more complex than queries on a single table , but once you get the hang of them, they become a powerful way to work with relational data.
 
To connect tables, JOINs rely on :

* Primary Keys – uniquely identify each record in a table.

* Foreign Keys – reference a primary key in another table to create a relationship.

**Basic Syntax**
```sql
SELECT columns
FROM table1
JOIN table2 ON table1.column = table2.column;
```
This tells SQL to combine data where the values in the specified columns match in both tables.

## Types of SQL JOINs



SQL offers different types of JOINs to handle different ways of combining data. 

#### Sample Tables

We'll be using two tables for our JOIN examples:

#### **Users Table:**

| user_id | name    | email                                       |
| ------- | ------- | ------------------------------------------- |
| 1       | Alice   | [alice@email.com](mailto:alice@email.com)   |
| 2       | Bob     | [bob@email.com](mailto:bob@email.com)       |
| 3       | Charlie | [charlie@email.com](mailto:charlie@email.com)|

#### **Orders Table:**

| order_id | user_id | product    |
| -------- | ------- | ---------- |
| 101      | 1       | Laptop     |
| 102      | 2       | Headphones |
| 103      | 1       | Mouse      |


### 1. INNER JOIN

An INNER JOIN combines rows from two or more tables based on a shared column, usually using primary and foreign keys. It returns only the rows where there’s a match in both tables.
Use it when you only want records that exist in both tables.



**Query:**

```sql
SELECT Users.name, Orders.product
FROM Users
INNER JOIN Orders
ON Users.user_id = Orders.user_id;
```
In this example, the INNER JOIN matches users with their respective orders. The result only includes users who have made orders, which are Alice (with Laptop and Mouse) and Bob (with Headphones). If there were a user with no order, they wouldn’t appear in the result.

**Result:**

| name  | product    |
| ----- | ---------- |
| Alice | Laptop     |
| Bob   | Headphones |
| Alice | Mouse      |

### 2. LEFT JOIN (or LEFT OUTER JOIN)
A LEFT JOIN returns all rows from the left table and the matching rows from the right table. If there’s no match, the result will include NULL values for columns from the right table.
Use it when you want to keep all records from the left table, even if there’s no matching data in the right table.

**Query:**

```sql
SELECT Users.name, Orders.product
FROM Users
LEFT JOIN Orders
ON Users.user_id = Orders.user_id;
```
In this example, we used LEFT JOIN to get all users, even if they don’t have orders. Charlie appears in the result with a NULL value in the product column because there is no matching order.

**Result**

| name    | product    |
| ------- | ---------- |
| Alice   | Laptop     |
| Bob     | Headphones |
| Alice   | Mouse      |
| Charlie | NULL       |

### 3. RIGHT JOIN (or RIGHT OUTER JOIN)
A RIGHT JOIN returns all rows from the right table and the matching rows from the left table. If there’s no match, the result will include NULL values for columns from the left table.
Use it when you want to keep all records from the right table, even if there’s no matching data in the left table.

**Query:**

```sql
SELECT Users.name, Orders.product
FROM Users
RIGHT JOIN Orders
ON Users.user_id = Orders.user_id;
```
In this example, the RIGHT JOIN ensures all orders are shown, even if there’s no matching user. If there were an order with no matching user, the user column would show NULL

| name  | product    |
| ----- | ---------- |
| Alice | Laptop     |
| Bob   | Headphones |
| Alice | Mouse      |

*(If there were an unmatched order like user_id = 4, you'd see NULL | SomeProduct in the result.)*

### 4. FULL OUTER JOIN
A FULL OUTER JOIN returns all rows from both tables. If there’s a match between the two tables, it shows the data from both sides. If there’s no match, it fills in NULL for the missing side.
Use it when you want to keep all records from both tables, regardless of whether there's a match.

**Query:**

```sql
SELECT Users.name, Orders.product
FROM Users
FULL OUTER JOIN Orders
ON Users.user_id = Orders.user_id;
```
This will show all users and all orders. If a user doesn’t have an order, the product will be NULL. If an order doesn’t have a matching user, the name will be NULL.

| name    | product    |                                  |
| ------- | ---------- | -------------------------------- |
| Alice   | Laptop     |                                  |
| Bob     | Headphones |                                  |
| Alice   | Mouse      |                                  |
| Charlie | NULL       |                                  |
| NULL    | Monitor    | *(if an unmatched order exists)* |

### 5. CROSS JOIN
A CROSS JOIN returns the Cartesian product of the two tables it matches every row in the first table with every row in the second table.
Use it when you want all possible combinations of rows between two tables.

**Query:**

```sql
SELECT Users.name, Orders.product
FROM Users
CROSS JOIN Orders;
```
If the Users table has 3 rows and Orders has 3 rows, the result will have 3 × 3 = 9 rows.

| name    | product    |
| ------- | ---------- |
| Alice   | Laptop     |
| Alice   | Headphones |
| Alice   | Mouse      |
| Bob     | Laptop     |
| Bob     | Headphones |
| Bob     | Mouse      |
| Charlie | Laptop     |
| Charlie | Headphones |
| Charlie | Mouse      |

### 6. SELF JOIN
A SELF JOIN is a join where a table is joined with itself. This is useful when you want to compare rows within the same table for example, to find relationships between records.

Use Case:
Imagine a situation where a user has referred other users, and you want to find the referrer for each user.


Example Table: ``users``

| user\_id | name    | referrer\_id |
| -------- | ------- | ------------ |
| 1        | Alice   | NULL         |
| 2        | Bob     | 1            |
| 3        | Charlie | 1            |
| 4        | Diana   | 2            |

In this example,`` referrer_id`` refers to the`` user_id`` of the person who referred the user.

**Query:**

```sql
SELECT Users.name AS User, Referrers.name AS Referrer
FROM Users
LEFT JOIN Users AS Referrers ON Users.referrer_id = Referrers.user_id;

```
Result :

| User    | Referrer |
| ------- | -------- |
| Alice   | NULL     |
| Bob     | Alice    |
| Charlie | Alice    |
| Diana   | Bob      |


## Why Use JOINs in SQL?


1. **Data Integrity**

Use foreign keys and JOINs to maintain consistency across tables, ensuring that related data is accurate.

2. **Bring Related Data Together**

Combine records, like matching users with their orders, for a comprehensive view.

3. **Data Organization**

Normalize your database into separate tables, and use JOINs to bring data together when needed.

4. **Real-World Insights**

Answer questions like “Which users haven’t placed any orders?” or “What products did each customer buy?”

5. **Build Better Reports**

Combine data from different tables to generate meaningful and actionable insights.

6. **Efficiency with Large Datasets**

Avoid redundancy and manage large datasets effectively by joining data on demand.

