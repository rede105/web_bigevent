
$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnimage').on('click', function () {

        $('#file').click();

    })

    $('#file').on('change', function (e) {
        var file = e.target.files
        // console.log(file);
        if (file.length === 0) return layer.msg('没有图片上传')

        var file1 = e.target.files[0]

        var newImgURL = URL.createObjectURL(file1)
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)


    })

    $('#btnupload').on('click', function () {

        var dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串




        $.ajax({
            method: 'POST',
            url: 'my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败！')
                }
                layer.msg('更新头像成功！')


                window.parent.postname();
            }


        })
    })

})
