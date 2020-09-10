$(function() {
    $('.reg-box').hide()

    // 点击去注册账号链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击 "去登录"的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
        // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],

        // 校验两次密码是否一致
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 换需要拿到密码框中的内容
            // 进行判断 
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://--------', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                        // console.log(res.message)
                }
                // console.log('注册成功');
                layer.msg('注册成功,请登录!')
                    // 模拟点击行为
                $('#link_login').click()
            })
    })

})