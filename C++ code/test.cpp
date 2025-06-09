// #include <iostream>
// using namespace std;

// int main() {
    
//     int i;
//     int number[6];
//     int sum;



//     cout << "Enter Your Number: " << endl;


//     for(i = 0;i < 6; i++) {
//         cout << "Number " << i+1 << ":" << endl;
//         cin >> number[i];
//         sum += number[i];
//     }

//     cout << "The sum is " << sum << endl;



//     return 0;
// }

#include <iostream>
using namespace std;

// int main() {
//     int choice;

//     cout << "Enter a number between 1 and 3: ";
//     cin >> choice;

//     switch (choice) {
//         case 1:
//             cout << "You chose 1" << endl;
//             break;
//         case 2:
//             cout << "You chose 2" << endl;
//             break;
//         case 3:
//             cout << "You chose 3" << endl;
//             break;
//         default:
//             cout << "Invalid choice" << endl;
//             break;
//     }

//     return 0;
// }

//int main() {



   // int val[0];
   // int i;

   // for(i=0; i > 0; i++) {
        
 //   }



    //return 0;
//}


// Class and Objects
// class Car {
// public:
//     string brand;
//     int year;

//     void displayInfo() {
//         cout << "Brand: " << brand << ", Year: " << year << endl;
//     }
// };

// int main() {
//     Car car1;  // Creating an object
//     car1.brand = "Toyota";
//     car1.year = 2020;
//     car1.displayInfo();

//     Car car2;
//     car2.brand = "Benz";
//     car2.year = 2023;
//     car2.displayInfo();

//     return 0;
// }

//Encupsulation
// class BankAccount {
//     private:
//         double balance;

//     public:
//         BankAccount(double initialBalance) {
//             balance = initialBalance;
//         }

//         void deposite(double amount) {
//             balance += amount;
//         }

//         double getbalance() const {
//             return balance;
//         }
// };

//Inheritance
// class Animal {
// public:
//     void eat() {
//         cout << "This animal is eating." << endl;
//     }
// };

// class Dog : public Animal {
// public:
//     void bark() {
//         cout << "The dog barks." << endl;
//     }
// };

// int main() {
//     Dog myDog;
//     myDog.eat();   // Inherited from Animal class
//     myDog.bark();  // Defined in Dog class

//     return 0;
// }
