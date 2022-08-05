function postname() {
    $.ajax(
        {
            method: 'GET',
            url: 'my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('获取用户信息失败！');
                // console.log(res); 

                render(res.data);
            },
            // complete: function (res) {
            //     console.log(res);

            //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //         localStorage.removeItem('token');
            //         location.href = '/login.html'
            //     }
            // }
        }
    )
}


function render(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp' + name);
    // console.log(user);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();

        var first = name[0].toUpperCase();
        // console.log(first);
        $('.text-avatar').html(first).show();

    }
}

$(function () {
    postname();
    var layer = layui.layer;

    $('#btnlogout').on('click', function () {
        // console.log(11);

        //eg1
        layer.confirm('确定退出登录 吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

// 监听注册表单的提交事件
// $('#form_reg').on('submit', function (e) {
//     // 1. 阻止默认的提交行为
//     e.preventDefault()
//     // 2. 发起Ajax的POST请求
//     var data = {
//         username: $('#form_reg [name=username]').val(),
//         password: $('#form_reg [name=password]').val()
//     }
//     postname(data);

// })

