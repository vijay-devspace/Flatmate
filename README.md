# Flatmate
Express.js app show some borrowing between friends

you can use postman for testing.
1: First Insert the give take data of users like below example:
a)Post request with 
b) body data set (option : RAW JSON) --see pic
json in body would be: 
{
"userId":"u3",
"amount":1000

}

![image](https://user-images.githubusercontent.com/90952279/133878293-90281842-869c-4a58-8716-818d11e3659a.png)



2: Below example : Get method request, to get => user1 ownes user3 : amount

transact/u1/u3  
this will results =>" user1 ownes user3 : amount "

localhost:9000/transact/u1/u3
![image](https://user-images.githubusercontent.com/90952279/133878236-bd94d7da-09d4-4f53-8801-50901f2931c1.png)
