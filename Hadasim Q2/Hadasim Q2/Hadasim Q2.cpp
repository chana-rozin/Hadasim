using namespace std;
#include <iostream>

void rectangle_case();
void trangle_case();
void print_traingle(int height, int width);


int main()
{
    int choice = 0;
    while (choice != 3) {
        cout << "Please Enter your choice:\n 1-rectangle \n 2-traingle \n 3-exit" << endl;
        cin >> choice;
        switch (choice)
        {
        case 1:
            rectangle_case();
            break;
        case 2:
            trangle_case();
            break;
        case 3:
            break;
        default:
            cout << "Invalid input, try again" << endl;
            break;
        }
    }
    return 0;
}

void rectangle_case() {
    cout << "Enter height" << endl;
    int height, width;
    cin >> height; //Valid input is guaranteed
    cout << "Enter width" << endl;
    cin >> width; //Valid input is guaranteed
    if (height == width || abs(height - width) > 5)
        cout << "area: " << height * width << endl; //rectangle area
    else
        cout << "circumference: " << height * 2 + width * 2 << endl; //rectangle circumference
}


void trangle_case() {
    cout << "Enter height" << endl;
    int height, width;
    cin >> height; //Valid input is guaranteed
    cout << "Enter width" << endl;
    cin >> width; //Valid input is guaranteed
    cout << "Please enter your choice: \n 1 - calculate the circumference \n 2 - print" << endl;
    int choice;
    cin >> choice;
    switch (choice)
    {
    case 1:
    {
        double hypotenuse = sqrt(pow(height, 2) + pow(width, 2)); //Pythagorean Theorem
        cout << "circumference: " << hypotenuse * 2 + width << endl; //trangle circumference
        break;
    }
    case 2:
        print_traingle(height, width);
        break;
    default:
        break;
    }
}



void print_traingle(int height, int width) {
    if (width % 2 == 0 || height * 2 < width) {
        cout << "Sorry printing is impossible" << endl;
    }
    else
    {
        int even_n = (width - (width % 2 == 0 ? 1 : 2)) / 2;    //count the even numbers between 1-height
        int l_repeat = !even_n ? 0 : (height - 2) / even_n;    //how many times each inner line will be print
        int left = !l_repeat ? height - 2 : (height - 2) % even_n;  //remaining lines
        int asteric = 1, repeat=0;
        for (int i = 0; i < height; i++) {
            string s(width / 2 - asteric/2, ' '), a(asteric, '*');  //create current line
            cout << s + a << endl;
            repeat++;
            switch (asteric) {
            case 1:
                if (l_repeat || i == height - 2) {  //check if it not edge case with width 3
                    asteric += 2;
                    repeat = 0;}
                break;
            case 3:
                if (repeat == l_repeat + left) {    //count the remaining lines in the first group
                    asteric += 2;
                    repeat = 0;}
                break;
            default:
                if (repeat == l_repeat) {
                    asteric += 2;
                    repeat = 0;}
                break;
            }
        }
    }
}


