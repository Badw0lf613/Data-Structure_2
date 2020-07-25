from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer

#建立索引，生成词典
#打开之前处理完成的txt文件
f = open('D:\\Y\\python\\Data_Structure\\dict\\Lincoln_new.txt','r')  # D:\\Y\\python\\Data_Structure\\dict\\BorisJohnson.txt
o = open('D:\\Y\\python\\Data_Structure\\dict\\testDic.txt','w')  # D:\\Y\\python\\Data_Structure\\dict\\testDic.txt
dict = {}  # 初始化字典
cnt = 0
while True:
    #利用readlines函数读入文本
    sentence_list = f.readlines(100000)
    if not sentence_list:
        break
    else:
        for sent in sentence_list:
            # sent = sent.decode('utf8')
            sent = sent.split(u' ')
            for word in sent:
                if word == u'':
                    continue
                if not word in dict:
                    dict[word] = 1
                else:
                    dict[word] += 1
        for key, value in dict.items():
            # 以列表返回可遍历的(键, 值) 元组数组
            cnt += value
            o.write(key+' %d'%value+'\n')
            # 写入文本
            # o.write(key + '\n')
        # o.write('sum = %d'%cnt)

f.close()
o.close()
# print("我的词典：")
# print(dict)

def returnInstaSen(word):
    #返回例句
    #获取文件行数
    with open("D:\\Y\\python\\Data_Structure\\dict\\Lincoln.txt", 'r') as fo:
        length = len(fo.readlines())
        # print(length)

    fo = open("D:\\Y\\python\\Data_Structure\\dict\\Lincoln.txt", "r+")
    # word = "apple"
    cnt = 0
    for index in range(length):
        line = fo.__next__()
        if word in line:
            cnt += 1
            print("在语料库中找到例句"+str(cnt)+"："+line)
        if (index == length - 1 and cnt == 0):
            print("没有找到例句")
        # print("第 %d 行 - %s" % (index, line))
    fo.close()

def returnSynsandAnts(word):
    #寻找同义词和反义词
    synonyms = []
    antonyms = []

    for syn in wordnet.synsets(word):
        for l in syn.lemmas():
            synonyms.append(l.name())
            if l.antonyms():
                antonyms.append(l.antonyms()[0].name())
    if(set(synonyms).__len__() != 0):
        print("***下为"+str(word)+"的同义词***")
        print(set(synonyms))
    else:
        print("***没有找到"+str(word)+"的同义词***")
    if (set(antonyms).__len__() != 0):
        print("***下为"+str(word)+"的反义词***")
        print(set(antonyms))
    else:
        print("***没有找到"+str(word)+"的反义词***")

def returnDefinition(word):
    #利用wordnet模块
    #该句将返回同义词列表第一个量的词义
    print(wordnet.synset(str(word)+'.n.01').definition())

def returnCixin(word):
    #利用WordNetLemmatizer模块
    lemmatizer = WordNetLemmatizer()
    #这里做的是词形还原，将输出其原形（如输入cats，将输出cat）
    print(lemmatizer.lemmatize(word))

if __name__ == '__main__':
    print("***欢迎来到单词查询系统***")
    while True:
        k = input("请输入要查询的单词：")
        if k in dict.keys():
            # print(dict[k])
            print("找到单词："+str(k)+"，其出现频数："+str(dict[k]))
            while (key):
                key = input("***您想要查看什么信息***\n  1）查看例句 \n  2）查看同义词和反义词 \n"
                            "  3）查看词义解释 \n  4）查看词性变换 \n  0）退出本次查询 \n  请输入数字：")
                if key == "1":
                    print("正在寻找中，请稍候...")
                    returnInstaSen(k)
                elif key == "2":
                    print("正在寻找中，请稍候...")
                    returnSynsandAnts(k)
                elif key == "3":
                    print("正在寻找中，请稍候...")
                    returnDefinition(k)
                elif key == "4":
                    print("正在寻找中，请稍候...")
                    returnCixin(k)
                elif key == "0":
                    break
                else:
                    print("***输入格式错误***")
        else:
            print("***词典库中未找到这个单词***")