//Filter([$("select"),$(".logsshow"),$(".sectionshow")], $(".logstbl tr"));

function Filter(elements, tablerows, idx, out){

    var temp = [];
    var hid = [];
    var all = false;

    for(var x=idx; x < tablerows.length;x++){

        var txt = tablerows[x].innerText;

        for(var y=0;y < elements.length;y++){
                
            var passed = false;
            var val = elements[y].val();
            var find = new RegExp(val, 'g');
                
            if(val == "Today"){
                    
                var s = "seconds ago";
                var m = "minutes ago";
                var h = "hours ago";
                var hh = "hour ago"
                    
                var txts = new RegExp(s, "g");
                var txtm = new RegExp(m, "g");
                var txth = new RegExp(h, "g");
                    
                if($(elements[y]).val() == "All"){
                    $(tablerows).show();
                }if(txt.includes(s) || txt.includes(m) || txt.includes(h) || txt.includes(hh)){
                    passed = true;
                }else{
                    hid.push(tablerows[x]);
                }
                    
            }else{
                    
                if($(elements[y]).val() == "All"){
                    $(tablerows).show();
                    all = true;

                    if(out){
                        temp.push(tablerows[x]);
                    }

                }else if(txt.match(find)){
                    passed = true;
                }else{
                    hid.push(tablerows[x]);
                }    
            }
                
        }

        if(passed) temp.push(tablerows[x]);

    }

    for(var x=0; x < temp.length; x++){
        $(temp[x]).show();
    }

    for(var x=0; x < hid.length; x++){
        $(hid[x]).hide();
    }

    if(out){
        return temp;
    }

}

function Search(find, tablerows, idx){

    var valids = [];
    var invalids = [];

    for(var x = idx; x < tablerows.length;x++){
        var txt = new RegExp(find, 'g');
        var itxt = tablerows[x].innerText;

        if(itxt.match(txt)){
            valids.push(tablerows[x]);
        }else{
            invalids.push(tablerows[x]);
        }
    }

    for(var x=0; x < valids.length; x++){
        $(valids[x]).show();
    }

    for(var x=0; x < invalids.length; x++){
        $(invalids[x]).hide();
    }

    if(find == ""){
        for(var x=0; x < tablerows.length; x++){
            $(tablerows[x]).show();
        }
    }

    return valids;

}

function Write(data, idx){
    var res = "";
    for(var x=idx; x< data.length;x++){
        var row = document.createElement("tr");
        for(var y = 0; y < data[x].childNodes.length; y++){
            if(data[x].childNodes[y].nodeName == "TD"){
              row.appendChild(data[x].childNodes[y]);
            }
        }
        res += row.outerHTML;
    }
    //console.log(res);
    return res;
}
