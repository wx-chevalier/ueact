# raspberry-wechat-assistant

## 微信信息抓取

```py
import itchat

itchat.auto_login()

itchat.send('Hello, filehelper', toUserName='filehelper')
```

```py
import led

#itchat 框架，关注 TEXT 消息
@itchat.msg_register(itchat.content.TEXT)
def text_reply(msg):
    #得到任何text消息就打开流水灯，最后原消息返回
    led.openLed()
    print(msg.text)
    return msg.text

itchat.auto_login(enableCmdQR=2)
itchat.run()
```

## 文字转语音

我们首先将本文转化为语音文件：

```py
def text2voice(text, delete=false):
    url = 'http://tts.baidu.com/text2audio?idx=1&tex={0}&cuid=baidu_speech_' \
          'demo&cod=2&lan=zh&ctp=1&pdt=1&spd=4&per=4&vol=5&pit=5'.format(text)
    # 直接播放语音
    os.system('mplayer "%s"' % url)

    if delete:
        os.system('rm -rf "%s"' % url)

text2voice(text)
```

使用 mplayer 实现语音播放,通过以下命令安装 mplayer:

```sh
$ sudo apt-get install mplayer

# 播放本地音乐
$ mplayer \xxx\xxx\xxx.mp3(绝对地址)

# 播放在线音乐
$ mplayer "URL"
```

然后使用命令行来播放语音：

# Motivation & Credits

- [itchat #Project#](https://github.com/littlecodersh/ItChat): itchat 是一个开源的微信个人号接口，使用 python 调用微信从未如此简单。
