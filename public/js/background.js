// set the background image of the 4 pages
// image source from google+

$(document).ready(function() {
    var bgArray = [
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/0-a6fc0887d082747b75729625966a0922.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/1-4de74ec9bafec1ab931acc762a159cd7.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/2-68387354a465976652076f8fa4324938.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/3-ed85ffe7b9d87ab615fa30d2d2c23900.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/5-8e0483303b107c3af7302d4a063efb39.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/6-fd1a88b55fa14e1c2c7ac80d6e7c1bc9.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/7-02db70e72e235d198c287d7dafa607f2.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/8-2f82a9eb57ea77faf26ea98952c4dfa8.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/9-a32554c3b2fa138a2bf87cdc8a8f638d.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/10-c2bc79a6196c4955fe443ba5f60cb534.jpg', 
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/11-e3277b6ecccebbaf32db510d8e82a5ec.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/12-2d82ad5a092cbf761c2b3ab4f83d71a1.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/14-5ba4009ee899cf3d8d6e9ce1ed8cd4ed.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/15-293545917a029d218c2975d190dec5ad.jpg',
        'https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/16-ce8894b840469581ad9c9d907ac9b879.jpg'
        ];
    
    // generate an array of number from [0, bgArray.length-1]
    var bg_num_arr = []
    while(bg_num_arr.length < 4){
        var random_num = Math.floor(Math.random() * (bgArray.length-1))
        if(bg_num_arr.indexOf(random_num) > -1) continue;
        bg_num_arr[bg_num_arr.length] = random_num;
    }
    
    var bg1 = bgArray[bg_num_arr[0]];
    var bg2 = bgArray[bg_num_arr[1]];
    var bg3 = bgArray[bg_num_arr[2]];
    var bg4 = bgArray[bg_num_arr[3]];
    
    $('.background:nth-child(1)').css('background-image', 'url('+bg1+')');
    $('.background:nth-child(2)').css('background-image', 'url('+bg2+')');
    $('.background:nth-child(3)').css('background-image', 'url('+bg3+')');
    $('.background:nth-child(4)').css('background-image', 'url('+bg4+')');
}); 