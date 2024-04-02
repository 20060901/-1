// 判断一个数字的奇偶性
function isEvenOrOdd(number) {
    if (number % 2 === 0) {
        return "even";
    } else {
        return "odd";
    }
}

function get_servers(csrf, api) {
    $.ajaxSetup({
        data: {
            csrfmiddlewaretoken: csrf
        }
    });
    $.ajax({
        type: 'get',
        url: api,
        dataType: 'json',
        success: function (ret) {
            if (ret.code === 0) {
                let table_body = '';
                for (let i = 0; i < ret.data['list'].length; i++) {
                    const item = ret.data['list'][i];
                    const {
                        status,
                        name,
                        uptime,
                        system,
                        cpu_cores,
                        cpu_model,
                        cpu,
                        load_1,
                        load_5,
                        load_15,
                        memory_total,
                        memory_used,
                        swap_total,
                        swap_used,
                        hdd_total,
                        hdd_used,
                        network_in,
                        network_out,
                        process,
                        thread,
                        tcp,
                        udp,
                        memory,
                        hdd,
                        version,
                        date,
                        interval,
                        client_version
                    } = item;
                    let status_bg = 'bg-success';
                    let is_show = '';
                    let cpu_bg = 'bg-success', memory_bg = 'bg-success', hdd_bg = 'bg-success';
                    // 根据状态使用不同的颜色的点
                    if (status !== "online") {
                        status_bg = 'bg-danger'
                    }
                    // 保留原来的展开状态
                    if ($('#more-info-' + i).hasClass('show')) {
                        is_show = 'show'
                    }
                    // 判断进度条颜色
                    if (60 < cpu && cpu < 80) {
                        cpu_bg = 'bg-warning'
                    } else if (cpu >= 80) {
                        cpu_bg = 'bg-danger'
                    }
                    if (60 < memory && memory < 80) {
                        memory_bg = 'bg-warning'
                    } else if (memory >= 80) {
                        memory_bg = 'bg-danger'
                    }
                    if (60 < hdd && hdd < 80) {
                        hdd_bg = 'bg-warning'
                    } else if (hdd >= 80) {
                        hdd_bg = 'bg-danger'
                    }
                    const item_html = `<tr data-toggle="collapse" data-target="#more-info-${i}" class="accordion-toggle ${isEvenOrOdd(i)}" aria-expanded="true">` +
                        `<td><div class="status-container"><div class="status-icon ${status_bg}"></div></div></td>` +
                        `<td>${name}</td>` +
                        `<td>${uptime}</td>` +
                        `<td>${load_1} | ${load_5} | ${load_15}</td>` +
                        `<td>${network_out} | ${network_in}</td>` +
                        `<td><div class="progress"><div class="progress-bar ${cpu_bg}" role="progressbar" style="width: ${cpu}%;" aria-valuenow="${cpu}" aria-valuemin="0" aria-valuemax="100">${cpu}%</div></div></td>` +
                        `<td><div class="progress"><div class="progress-bar ${memory_bg}" role="progressbar" style="width: ${memory}%;" aria-valuenow="${memory}" aria-valuemin="0" aria-valuemax="100">${memory}%</div></div></td>` +
                        `<td><div class="progress"><div class="progress-bar ${hdd_bg}" role="progressbar" style="width: ${hdd}%;" aria-valuenow="${hdd}" aria-valuemin="0" aria-valuemax="100">${hdd}%</div></div></td>` +
                        `<td>${version}</td>` +
                        '</tr>';
                    const item_even_html = `<tr class="expandRow ${isEvenOrOdd(i)}"><td colspan="16"><div class="accordian-body collapse ${is_show}" id="more-info-${i}" aria-expanded="true">` +
                        `<div>系统版本: ${system}</div>` +
                        `<div>CPU型号: ${cpu_model}</div>` +
                        `<div>CPU核心数: ${cpu_cores}</div>` +
                        `<div>内存: ${memory_used} / ${memory_total}</div>` +
                        `<div>Swap: ${swap_used} / ${swap_total}</div>` +
                        `<div>硬盘: ${hdd_used} / ${hdd_total}</div>` +
                        `<div>TCP|UDP: ${tcp} | ${udp}</div>` +
                        `<div>进程数|线程数: ${process} | ${thread}</div>` +
                        `<div>上报频率: ${interval} 秒</div>` +
                        `<div>上报时间: ${date}</div>` +
                        `<div>客户端版本: ${client_version}</div>` +
                        '</div></td></tr>'
                    table_body += item_html + item_even_html;
                }
                $('#servers').html(table_body);
            }
        },
    })
}