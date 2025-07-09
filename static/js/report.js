$(document).ready(function () {
   
    $('.report-btn').on('click', function () {
        $('#report-modal').fadeIn();
    });

    $('.close-btn').on('click', function (e) {
        if (e.target.id === 'report-modal' || $(e.target).hasClass('close-btn')) {
            $('#report-modal').fadeOut();
        }
    });

    $('.report-modal-content').on('click', function (e) {
        e.stopPropagation();
    });

    $('#submit-report').on('click', function () {
        const reason = $('#report-reason').val();
        const contact = $('#contact-info').val();
        const edtValidcode = $('#edtValidcode').length > 0 ? $('#edtValidcode').val() : null; 
		const csrfToken = $('#csrfToken').val();
		const PostID = $('#PostID').val();
        if (!reason || !contact) {
            alert('请填写完整信息！');
            return;
        }
		if ($('#edtValidcode').length > 0 && !edtValidcode) {
			alert('请填写验证码');
			return;
		}
		if (!csrfToken || !PostID) {
            alert('信息验证失败，请刷新重试。');
            return;
        }
        const $submitBtn = $(this);
        $submitBtn.prop('disabled', true).text('提交中...');

        $.ajax({
            url: bloghost + "zb_users/theme/San_ManHua/functions/submit_form.php?act=report",
            type: 'POST',
            data: {
                reason: reason,
                contact: contact,
                edtValidcode: edtValidcode,
				PostID: PostID,
				csrfToken: csrfToken,
            },
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    alert('提交成功！');
                    $('#report-modal').fadeOut();
                    $('#report-reason').val('');
                    $('#contact-info').val('');
                    $('#edtValidcode').val('');
                } else {
                    alert(`提交失败：${response.message}`);
                }
            },
            error: function (xhr, status, error) {
                alert(`请求失败：${error}`);
            },
            complete: function () {
               $submitBtn.prop('disabled', false).text('提交');
            },
        });
    });
});
