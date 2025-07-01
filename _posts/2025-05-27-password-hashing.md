---
layout: post
title: "Password Hashing"
author: "Kate Ratemo"
date: 2025-06-28 10:00:00 +0300
categories: [security, backend]
tags: [hashing, passwords, encryption, csharp, cybersecurity, salting, best-practices]
image:
  path: /assets/images/hashing.png
  alt: "Visual illustration of password hashing with code and lock"
author_image:
  path: /assets/images/headshot.png
description: "Understand how password hashing works, why it's important, and how to securely implement it in C#. Learn about salting, SHA-256, and real-world security practices."
excerpt_separator: <!--more-->
---

## So, What Is Hashing?

Hashing is basically turning your password into a secret code that no one (not even you) can reverse. 

When someone signs up, you don’t store their actual password. Instead, you store this code, called a **hash**. Later, when they log in, you hash the password they enter and check if it matches the stored hash. If it does, they’re in.

Wanna see how it works? Try this simple example yourself and see what output you get!


### Demo 
```csharp
// This is a C# example you can run in LINQPad.
// It hashes a password using SHA-256 and prints the hash.
// Notice you can choose to keep or remove the hyphens in the output.

void Main()
{
    var password = "MyAwesomePass123";

    // Convert the password string to bytes
    var passwordBytes = System.Text.Encoding.UTF8.GetBytes(password);

    // Create SHA256 instance
    using var sha256 = System.Security.Cryptography.SHA256.Create();

    // Compute the hash
    var hashBytes = sha256.ComputeHash(passwordBytes);

    // Convert hash bytes to a hex string with hyphens (default)
    var hashWithHyphens = BitConverter.ToString(hashBytes);

    // Or convert to hex string without hyphens (more common)
    var hashWithoutHyphens = hashWithHyphens.Replace("-", "").ToLower();

    Console.WriteLine($"Original Password: {password}");
    Console.WriteLine($"SHA-256 Hash (with hyphens): {hashWithHyphens}");
    Console.WriteLine($"SHA-256 Hash (without hyphens): {hashWithoutHyphens}");
}

```

Here is what I get when I run it 

![hash](file:///C:/Users/Boat/Desktop/hash.png)

---

## Hashing Alone Is NOT Enough though

Imagine two users both use the same password ,say, `123456`. If you only hash the password, they’ll end up with the same hash in the database. You do not want that

### **Salting**

A **salt** is a random string added to your password before hashing. It makes every hash unique.

### Demo 

```csharp
void Main()
{
    // The password we want to hash
    var password = "MyAwesomePass123";

    // Generate a random salt using a GUID string
    var salt = Guid.NewGuid().ToString();

    // Combine the salt and password before hashing
    var saltedPassword = salt + password;

    // Create a SHA256 hashing object
    using var sha256 = System.Security.Cryptography.SHA256.Create();

    // Convert the salted password into bytes
    var bytes = System.Text.Encoding.UTF8.GetBytes(saltedPassword);

    // Compute the SHA256 hash of the salted password bytes
    var hashBytes = sha256.ComputeHash(bytes);

    // Convert the hash bytes to a hexadecimal string with hyphens
    var hash= BitConverter.ToString(hashBytes).Replace("-", "").ToLower();


    // Output the salt and the final hash to the console
    Console.WriteLine("Salt: " + salt);
    Console.WriteLine("Salted Hash: " + hash);
}

```
### Output

![saltedhas](file:///C:/Users/Boat/Desktop/saltedhas.png)

Just remember to store both the `salt` and the `hash` in your database.



## Use Password-Safe Hashing Algorithms 

Not all hashing algorithms are built for securing passwords. Some, like SHA-256, are way too fast ,making it easier for attackers to guess passwords quickly.Here are the most secure and recommended hashing algorithms for passwords:

* **bcrypt** – simple, trusted, and has a built-in salt
* **PBKDF2** – supported natively in .NET
* **Argon2** – modern, secure, and recommended for new projects

These algorithms are designed to be slow and memory-hungry on purpose. Why? Because it makes brute-force attacks painfully slow for attackers.

### Lets try PBKDF2 in .NET 

This is short for **Password-Based Key Derivation Function 2**. It’s a mouthful, but here’s the idea: PBKDF2 takes a password, mixes in a random salt, and hashes it thousands of times to make it computationally expensive for attackers to crack.

.NET gives us a built-in class called ``Rfc2898DeriveBytes`` that does all the heavy lifting. With just a few lines of code, you can create a hash that’s strong, slow (on purpose), and safe for storing in a database.

### Demo 

```csharp
void Main()
{
    // User's password input
    var password = "MyAwesomePass123";

    // Generate a secure random salt (128 bits)
    var saltBytes = RandomNumberGenerator.GetBytes(16); 
    var saltBase64 = Convert.ToBase64String(saltBytes);

    // Define number of iterations and hash size
    var iterations = 100_000;
    var hashLength = 32; // 256-bit hash

    // Derive the hash using PBKDF2 with SHA256
    var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, iterations, HashAlgorithmName.SHA256);
    var hashBytes = pbkdf2.GetBytes(hashLength);
    var hashBase64 = Convert.ToBase64String(hashBytes);

    // Output
    Console.WriteLine("Password: " + password);
    Console.WriteLine("Salt (Base64): " + saltBase64);
    Console.WriteLine("PBKDF2 Hash (Base64): " + hashBase64);
    Console.WriteLine("Iterations: " + iterations);
}


```
### Output
![salt](file:///C:/Users/Boat/Desktop/salt.png)

> **Note:** When verifying a password, you use the same salt and algorithm to hash the input and compare it with the stored hash.


You notice above that this version is better because:

* It uses a cryptographically secure random salt (RandomNumberGenerator.GetBytes) instead of a GUID, making it more secure.
* It encodes the salt and hash in Base64, which is compact and easier to store or transmit.
* It includes a configurable iteration count with PBKDF2, following best practices to slow down attackers and make it production-ready.



## What Should Go in the Database?

You never store the actual password. Here’s a basic table:

| Field          | Description                     |
| -------------- | ------------------------------- |
| username       | Unique name or email            |
| salt           | Randomly generated per password |
| password\_hash | Hashed password (after salting) |

If you're using bcrypt or Argon2, you may not need to store the salt separately because it's usually bundled in the hash.


## Best Practices

* Never store plain text passwords.
* Use slow, password-safe algorithms.
* Generate and store a unique salt for each password.
* Rely on well-tested cryptographic libraries instead of creating your own.

