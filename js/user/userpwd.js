$(function () {

    var form = layui.form;

    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        samepwd: function (value) {
            if (value === $('[name=oldpwd]').val()) return '密码不能相同'

        },
        repwd: function (value) {
            if (value !== $('[name=newpwd]').val()) return '两次密码不一致'


        }
    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // console.log(e);

        $.ajax({
            method: 'POST',
            url: 'my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layui.layer.msg('更新密码失败')

                layui.layer.msg('修改密码成功！')

                $('.layui-form')[0].reset()
            }

        })
    })
})