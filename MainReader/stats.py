import numpy as np
import matplotlib.pyplot as plt
class stats:
    def __init__(self):
        pass
    def piechart(self):
        months=['January','February','March','April','May','June','July','August','September','October','November','December']
        prices=[50,50,50,50,50,50,50,50,50,50,50,50]
        plt.pie(prices,labels=months,autopct='%0.1f%%')
        plt.show()
    def bargraphs(self):
        months=['January','February','March','April','May','June','July','August','September','October','November','December']
        prices=[210,300,150,420,23,1,46,13,87,32,3,43]
        ypos=np.arange(len(months))
        plt.bar(ypos,prices)
        plt.xticks(ypos,months)
        plt.ylabel("EXPENDITURE")
r1=stats()
r1.piechart()
r1.bargraphs()
