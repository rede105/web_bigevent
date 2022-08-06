$(function () {

    function initcale() {
        $.ajax({
            method: 'GET',
            url: 'my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlstr = template('tpl_table', res)
                $('tbody').html(htmlstr);
            }
        })
    }
    initcale();


    var layer = layui.layer;
    var form = layui.form;
    $('#btnaddcate').on('click', function () {

        layer.open({
            type: 1,
            title: '添加文章分类'
            , content: $('#dialog-add').html(),
            area: ['500px', '250px']
        });

    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();


        $.ajax({
            method: 'POST',
            url: 'my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status !== 0) return layer.msg('新增分类失败')

                layer.msg('新增分类成功')
                initcale();
            }
        })



    })

    var indexedit = null;
    $('tbody').on('click', '#btn-edit', function () {

        indexedit = layer.open({
            type: 1,
            title: '修改文章分类'
            , content: $('#dialog-edit').html(),
            area: ['500px', '250px']
        });

        var id = $(this).attr('data-id');
        // console.log(id);

        $.ajax({
            method: 'GET',
            url: 'my/article/cates/' + id,
            success: function (res) {
                console.log(res);
                form.val('form-add', res.data)
            }

        })

    })


    $('body').on('submit', '#form-edit', function (e) {

        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('更新分类失败')
                layer.msg('更新分类成功')
                layer.close(indexedit);
                initcale();
            }
        })

    })


    $('tbody').on('click', '.btn-delete', function (e) {

        var id = $(this).attr('data-id');

        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: 'my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) return layer.msg('删除失败')


                    layer.msg('删除成功')
                    layer.close(index);
                    initcale();
                }
            })
        });

    })




})