#文本预处理，做分词、清洗工作
#首先引入nltk以及re的模块，以便后续使用
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import re

#python正则表达式
#后续做清洗时会用到
#主要对一些标点符号进行了分割
pattern = r'(\/\w+)|(\d+\-\S+)|(\[)|(\]\S+)|(\])|(\')|(\")|(\.)|(\,)|(\;)|(\!)|(\()|(\))|\$?\d+(\.\d+)?%?| \.\.\.| ([^A-Za-z0-9]\.)+ '

#在这里增加新的语料
mytxt1=open("D:\\Y\\python\\Data_Structure\\dict\\Lincoln1.txt")#打开
sentence_list = mytxt1.readlines(100000)
open("D:\\Y\\python\\Data_Structure\\dict\\Lincoln.txt",'a+').writelines(sentence_list)


#读入准备好的文章（txt文件）
mytxt=open("D:\\Y\\python\\Data_Structure\\dict\\Lincoln.txt")#打开
s=mytxt.read()#读取
mytxt_senttok = sent_tokenize(s)#做分句
#打印利用sent_tokenize做分句后的效果
print("分句：")
print(mytxt_senttok)
#写入新的txt中
open("D:\\Y\\python\\Data_Structure\\dict\\Lincoln(after process).txt",'a+').writelines(mytxt_senttok)
#这里的属性为a+打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。

#利用正则表达式删去标点符号
senttok_regexp = re.compile(pattern).sub('',str(mytxt_senttok))#需要转换为字符串
print("分句（正则表达式）：")
print(senttok_regexp)
open("D:\\Y\\python\\Data_Structure\\dict\\Lincoln(after regexp).txt",'a+').writelines(senttok_regexp)
#这里使用a+同理

#对此前正则化后的文本做分词
senttok_regexp_wordtok = word_tokenize(senttok_regexp)
print("分词：")
print(senttok_regexp_wordtok)

#设置停止词，做适度清洗
stop_words = set(stopwords.words('english'))
senttok_regexp_wordtok_afterstop = []
for w in senttok_regexp_wordtok:
    if w not in stop_words:
        #对不在停止词内的词做append操作，以空格分隔
        senttok_regexp_wordtok_afterstop.append(w+' ')
print("分词（去除停止词）：")
print(senttok_regexp_wordtok_afterstop)
open("D:\\Y\\python\\Data_Structure\\dict\\Lincoln_new.txt",'a+').writelines(senttok_regexp_wordtok_afterstop)
print("文本已被写入D:\\Y\\python\\Data_Structure\\dict\\Lincoln_new.txt")