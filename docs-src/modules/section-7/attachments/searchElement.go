// Autogenerated with DRAKON Editor 1.31

package main

import (
    "fmt"

)



func  main()  {
    // item 20
    data := []int {12,21,44,76,
    -4,33,78,-8,8,17}
    var value int 
    fmt.Print("Enter number: ")
    fmt.Scan(&value)
    // item 23
    fmt.Println("input data -->", data)
    // item 24
    searchElement(data, value)
}

func  searchElement(data []int, value int)  {
    // item 37
    var l bool = false
    // item 310001
    i := 1;
    for {
        // item 310002
        if i < len(data) {
            
        } else {
            break
        }
        // item 33
        if data[i] == value {
            // item 38
            l = true
            // item 36
            fmt.Println("The searched element - ", value)
        } else {
            
        }
        // item 310003
        i++;
    }
    // item 39
    if l == true {
        
    } else {
        // item 42
        fmt.Println("The element", value, "is missing")
    }
}


