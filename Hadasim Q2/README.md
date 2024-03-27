## Project: Shape Calculator

This project is a simple shape calculator that allows users to calculate the area, circumference, and print triangles or rectangles based on their input. The calculator provides options for rectangles, triangles, or exiting the program.

### How to Use

1. Compile the program using any C++ compiler.
2. Run the executable file generated.
3. Follow the on-screen prompts to choose an option:
    - Enter `1` to calculate rectangle area or circumference.
    - Enter `2` to calculate triangle circumference or print a triangle.
    - Enter `3` to exit the program.

### Features

- **Rectangle Calculation**: 
    - Users can input the height and width of a rectangle.
    - If the rectangle is a square or its sides differ by more than 5 units, the program calculates the area.
    - Otherwise, it calculates the circumference.

- **Triangle Calculation**:
    - Users can input the height and base width of a triangle.
    - They are then prompted to choose between calculating the triangle's circumference or printing the triangle.

- **Printing Triangles**:
    - The program allows users to print a triangle based on the given height and width.
    - If printing is impossible (due to even width or insufficient height), an appropriate message is displayed.

### Functions

- **rectangle_case()**:
    - Calculates area or circumference of a rectangle based on user input.

- **trangle_case()**:
    - Calculates triangle circumference or prints a triangle based on user input.

- **print_traingle(int height, int width)**:
    - Prints a triangle with the given height and width.

### Usage Example

```plaintext
Please Enter your choice:
 1-rectangle 
 2-traingle 
 3-exit
1
Enter height
5
Enter width
10
area: 50
Please Enter your choice:
 1-rectangle 
 2-traingle 
 3-exit
2
Enter height
6
Enter width
7
Please enter your choice: 
 1 - calculate the circumference 
 2 - print
2
  *
 ***
*****
Please Enter your choice:
 1-rectangle 
 2-traingle 
 3-exit
3
```

### Note

- Ensure valid input is provided when prompted.
- Printing of triangles is limited to cases where the width is odd and not less than twice the height.

### Author

This project was developed by Chana Rozin.