#!/usr/bin/env python
import random

gridSize = 5
minNum = 1
maxNum = 50
cards = 40

for i in range(cards):
    card = []
    randRange = range(minNum, maxNum)
    card = random.sample(randRange, gridSize * gridSize)
    for j in range(gridSize):
        string = ""
        for x in range(gridSize):
            string +=  str(card[i + j * gridSize]) + " "
        print(string)  

    print("\n")