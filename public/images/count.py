# -*- coding: UTF-8 -*-
# 批量修改文件名称
# 按顺序排序所有jpg、png为png图片


import os
filenames = os.listdir(os.getcwd())
nameList = []
for name in filenames:
    print(name)
    if name.endswith('.png') or name.endswith('.jpg'):
        nameList.append(name)
print(nameList)
for num in range(0, len(nameList)):
    print(num)
    os.rename(nameList[num], 'tempImg'+str(num)+'.jpeg')
for num in range(0, len(nameList)):
    if num < 9:
        os.rename('tempImg'+str(num)+'.jpeg', '0' + str(num + 1) + '.png')
    else:
        os.rename('tempImg'+str(num)+'.jpeg', str(num + 1) + '.png')
