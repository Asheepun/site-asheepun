/*
1: bouncer
2: jumper
3: spawner
4: giantJumper
5: follower
6: ghost
{
    map: [
        "..............................",  
        "..............................",
        "..............................", 
        "..............................",
        "..............................",
        "..............................",  
        "..............................",
        "..............................", 
        "..............................",
        "..............................",
        "..............................",  
        "..............................",
        "..............................", 
        "..............................",
        "..............................",
        "..............................",  
        "..............................",
        "..............................", 
        "..............................",
        "..............................",
    ],
},
{
    map: [
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
        ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", 
    ],
},
*/

export const difficultLevelTemplates = [
    {
        map: [//2
            "..6.......######6..########...",  
            "............####.....#####....",
            ".....P......####...P..####....", 
            ".............###......####....",
            ".............###......####....",
            ".............##.......####....",  
            "@............##.......###.....",
            ".............##.......###.....", 
            "§............##........##.....",
            "#............##........##.....",
            "#.............#........##.....",  
            "#.............#........##.....",
            "#.............#........##..P..", 
            ".........6....#........6#.....",
            "........................#.....",
            "........................#.....",  
            "#...........P.................",
            "#.............................", 
            "##............................",
            "##............................",
        ],
        helps: [],
    },
    {
        map: [//1
            "..............####............",  
            "...............##4.........P..",
            "................#.........3...", 
            "..............................",
            ".........................#####",
            ".@......................######",  
            "........................######",
            ".§.......................#####", 
            "###........................###",
            "###.......4.................##",
            "##..........................##",  
            "..............................",
            "............................P.", 
            ".............P.............3..",
            "..............................",
            "...............3.........#####",  
            "........................######",
            ".........##########...########", 
            "........###########.P.########",
            "........###########...########B",
        ],
        helps: [],
    },
];

const levelTemplates = [
    {
        map: [//26 shows scores and is the final level
            "..............................",  
            "..............................",
            "..............................", 
            "..............................",
            "..............................",
            "..............................",  
            "..............................",
            "..............................", 
            ".............................#",
            "...........................###",
            "..........................####",  
            "@..........................###",
            ".............................#", 
            "§..........................P.#",
            "##...........................#",
            "###........H...............###",  
            "#####....######...........####",
            "####################......####", 
            "####################......####",
            "#####################.....####",
        ],
        helps: ["Did you complete it too? Congratulations!"],
    },
    {
        map: [//25 boss level
            "##########....................",  
            "#########.....................",
            "#########.....................", 
            "#########.....................",
            "########......................",
            "########......................",  
            "########......................",
            "###,####......................", 
            "##,,####...............¤......",
            "##,,###.......................",
            "#,,,,##.......................",  
            "#,,,,##.......................",
            "#,,,,,,.......................", 
            "@,,,,,,.......................",
            ",,,,,,,.......................",
            "§,,,,##.......###......#######",  
            "##,,,##.......###......#######",
            "##,,,###......##.......#######", 
            "##,,,###.......#.......#######",
            "#,,,####.......#.......#######P",
        ],
    },
    {
        map: [//24
            "######.......#################",  
            "####...........###############",
            "###.............##############", 
            "###...............############",
            "###................###########",
            "###................###########",  
            "##.................###########",
            "##..................##########", 
            "#...................##########",
            "@...................##########",
            ",....................#########",  
            "§....................#########",
            "#.....................,,,,,###", 
            "#.....................,,,,,,,,",
            "#..................H..,,,,,,P,",
            "##...............######,,,,,,,",  
            "##...............#############",
            "##................############", 
            "##................############",
            "###................###########",
        ],
        helps: ["Continue at your own risk."],
    },
    {
        map: [//23
            "######........################",  
            "####...........#######..######",
            ",,,............######....#####", 
            ",,,............######....#####",
            ",,,.............#####....#####",
            "###.............#####.....####",  
            "###.............####......####",
            "###.............####......####", 
            "##...............###.......###",
            "##...............,##.......,,,",
            ",................,,,.......,P,",  
            "@................,$,.......,,,",
            ",................,,,.......###", 
            "§................###......H###",
            "#...............####......####",
            "#...............#####.....####",  
            "#..............H#####.....####",
            "##......##.....######....#####", 
            "##.....###.....######....#####",
            "###....####....######....#####",
        ],
        helps: ["I wouldn't be so glad.", "I'm glad I made it out of that valley."],
    },
    {
        map: [//22
            "##########.........6......####",  
            "########...................###",
            "##,,,,|....................,,,", 
            "#,p,,,.....................,P,",
            "#,,,,,.....................,,,",
            "#######...................####",  
            "#######...................####",
            "######....................####", 
            "####.......................###",
            "####.......................###",
            "###........................,##",  
            "###........................,,,",
            "#,@........................,,,", 
            ",,,....6...................,,,",
            ",,§........................,*,",
            ",###.......................###",  
            "####.......................###",
            "####......................####", 
            "####......................####",
            "###.......................####",
        ],
    },
    {
        map: [//21
            "######............6....#######",  
            "#####....................#####",
            "####.................P....,,##", 
            "####......................,,,#",
            "####......................,H,#",
            "####......................####",  
            "###......................#####",
            "###......................#####", 
            "###......................#####",
            "###.......................####",
            "###........................###",  
            "##.........................###",
            "##.........................,##", 
            ",@...6.....................,,,",
            ",,......P..................,P,",
            ",§.........................,,,",  
            "###.......................####",
            "###.......................####", 
            "###.......................####",
            "##.........................###",
        ],
        helps: ["Hello!"],
    },
    {
        map: [//20
            "######............############",  
            "#####................#########",
            "####...................#######", 
            "####....................######",
            "####....................######",
            "####.....................#####",  
            "###......................#####",
            "###.......................p###", 
            "###........................###",
            "###....................#######",
            "###.....................######",  
            "##........................,###",
            "##........................,,##", 
            ",@........................,,,,",
            ",,........................,,P,",
            ",§........................,,,,",  
            "###......................#####",
            "###......................#####", 
            "###.....................######",
            "##......................######",
        ],
        helps: ["Hello!"],
    },
    {
        map: [//19
            "#######..................#####",  
            "####......................####",
            "##...........................#", 
            ",@..........................p#",
            ",,..........................##",
            ",§...........................#",  
            "###...................#####...",
            "###..................######...", 
            "###....................###....",
            "##.............###...........#",
            "##............########......##",  
            "##.............######.......##",
            "#..............,,,,,,......###", 
            "#..............,,,,,,......,,,",
            "...............,,,,,,...##.,,,",
            "...............,,,,,#######,,,",  
            "##...........#################",
            "##..........##################", 
            "###.........##################",
            "###.........##################",
        ],
    },
    {
        map: [//18
            "#####.........######...#######",  
            "###.............###.....######",
            ",@.............####.......####", 
            ",,...........#####........|,,,",
            ",§..........######.........,P,",
            "###.........,,,##,.........,,,",  
            "##....#..#..,,,,,,........####",
            "###..##2.##,,,,,1,#...2...####", 
            "#######..##,,,,,,,##.....#####",
            "##############################",
            "##..##########################",  
            "##........#########....#######",
            "...........##,,,##.......#####", 
            ".5..........,,,,,............#",
            "............,,,,,.............",
            "####........,,,,,..........*..",  
            "####........#####.........####",
            "###.........#####..........###", 
            "###.........####...........###",
            "###..........###............##",
        ],
    },
    {
        map: [//17
            "#####..#####......#####....###",  
            "####.....##.........##......##",
            ",@,.......#.........#.......,,", 
            ",,,.......|.........I....P..,,",
            ",§,...........P.............,,",
            "###........................###",  
            "###.......#.........##########",
            "##.......##........###########", 
            "##.......###.....#############",
            "#........#####################",
            "#.......*############...######",  
            "###....##########..........###",
            "###....########..............#", 
            "##......######................",
            "#.......#####...............3.",
            "#.......#####.o...............",  
            "#......#########...........###",
            "##.....########............###", 
            "##.....#######..............##",
            "###....#######...............#",
        ],
    },
    {
        map: [//16
            "#####...................######",  
            "####......................####",
            ",,,........................,,,", 
            ",5,........................,P,",
            ",,,........................,,,",
            "###........................###",  
            "###........................###",
            "##.....................#######", 
            "##.P.................#########",
            "#................P....,,,#####",
            "######................,,,,,,,#",  
            "###################...,,,,,,,#",
            "#######################,,,,,,#", 
            "#########################,,,,#",
            "################,,,,,###,,,,##",
            ",@,,,,,,,,,,,,,,,,,,,,,,,,,,##",  
            ",,,,,,,,,,,,,,,,,,,,,,,,,,,,##",
            ",§,,,,,,,,,,,,,,,,,,,,,,,,,###", 
            "##################,,,,########",
            "###################,,,########",
        ],
    },
    {
        map: [//15
            "#####..................########",  
            "###......................#####",
            "##........................####", 
            "@,.........................###",
            ",,.....................5P..###",
            "§,.........................###",  
            "####.B..#####...##...#########",
            "####.....####...##...#########", 
            "###.......##..........########",
            "###.....................######",
            "###......................#####",  
            "##..............###......#####",
            "####.........######,,,,,,#####", 
            "#######.....#######,,,,,,#####",
            "#######,,,,,,,###,,,,,,,,,####",
            "###,,,,,,,,,,,,,,,,,,,,,,,,,,,",  
            "##,,P,,,,,,,,,,P,,,,##,,,,,,P,",
            "##,,,,,,,,,,,,,,,,,,###,,,,,,,",
            "#######################,,,####",
            "#######################,,,####",
        ],
    },
    {
        map: [//14
            "########..#########....#######",  
            "######.....########......#####",
            "#####.......######........####", 
            "#####.......,,,,,..........,,,",
            "#,,,........,,P,,..........,P,",
            "#5P,........,,,,,..........,,,",  
            "#,,,........,,,,,..........###",
            "#########..#######..##########", 
            "#########..#######..##########",
            "########....#####....#########",
            "###.........,,,,,......#######",  
            "##..........,,,,,......##.####",
            "##..........,,P,,.....###..###", 
            "#...........,,,,,########..###",
            "@...........,,,,#########..###",
            ",..........#############...###",  
            "§.........#############.....##",
            "##.........####.#######.....##", 
            "##..........##...#####......##",
            "###........###...#####.......#",
        ],
    },
    {
        map: [//13
            ".....#########################",  
            "........,,,,,,,,##############",
            ".....@..,,,,,,,,,,,,,#########", 
            "..#.....,,,,,,,,,,,,,#########",
            "..##.§..,,,,,,,,,,,,,#########",
            "..#######,,,,,,,,,,,,#########",  
            "..#######,,,,,,,,,,,,#########",
            "..,######,,,,,,,,,,,,,,#######", 
            "..######,,,,,,,,,,,,H,,,######",
            "...,####,,,,,,,,,,,,##,,######",
            "...,,###,,,,,,,,,,,,##,,######",  
            "...,,,,,,,,,,,,,,,,,,,,,######",
            "..##,,,,,,,,,,,,,,,,,,,#######", 
            "2.######,,,,,,,,,,,,,#########",
            "...####,,,,,,,,,,,,,,,,,,,,,,,",
            "##.,,,,,,,,,,,,,,,,,,,,,,,,P3,",  
            "##.,P,,,,,,,,,,,,,,,,,,,,,,,,,",
            "###,,,,,,,,,,,,,,,############", 
            "########,,,,,,,,,#############",
            "########,,,,,,,,,#############",
        ],
        helps: ["Do you think I can make that jump?"],
    },
    {
        map: [//12
            "......########################",  
            "......########..##############",
            ".@....########...##########...", 
            "......###,,###...###,,,,##....",
            "#§.....#,,,,,,....#,,,,,,,....",
            "##......,,,,,,....,,,,,,,,....",  
            "###.....,,P,,,....,,,,,,,,..P.",
            "###.....,,,,,,....,,,,,,,,....", 
            "##......,,,,##....,,,,,,,,..##",
            "##......######..B.,,,,,,,,..##",
            "#.......######....,,,,,,,,...#",  
            "#......#######....,,,,,,,,....",
            ".......#######....,,,,,,,,....", 
            ".......########...,,,,,,,,....",
            ".......########...#,,,,,,,....",
            "##.....########..##,,,,,,,,...",  
            "##....#########..##,,,,,,,,...",
            "###...#########..##,,,,,,,,..#", 
            "###...##########.##,,,,,,,,###",
            "####..#############,,,,,,,,###",
        ],
    },
    {
        map: [//11
            "..............################",  
            "................##############",
            ".@...............###..........", 
            "............................P.",
            ".§............................",
            "###......H...........H########",  
            "###.....###....###############",
            "###....####......#############", 
            "##.....###..........##########",
            "##......##...............#####",
            "##......##................$###",  
            "##......##H................###",
            "#.......####.............#####", 
            "#.......####..............####",
            "#.......###................###",
            "##.....####................###",  
            "##.....####................###",
            "##.....#####..............####", 
            "###...######............######",
            "#############.........########",
        ],
        helps: [
            "We are very social here.", 
            "Press H on your keyboard to return to our home.",
            "Talk to my friend over there to get ya pay.",
        ],
    },
    {
        map: [//10
            "..............................",  
            "..............................",
            "...........................P..", 
            "..............................",
            "..............................",
            "...........##............#####",  
            "..........####........########",
            "...........###.4......########", 
            "H.......................######",
            "##........................####",
            "##..........................##",  
            "#............................#",
            "..............................", 
            ".@............B.............3P",
            ".§............................",
            "###..............3P........###",  
            "####.......................###",
            "####........##########....####", 
            "###.....##############....####",
            "###.....##############....####",
        ],
        helps: ["Find and make safe spots."],
    },
    {
        map: [//9
            "######........................",  
            "####..........................",
            "####..........................", 
            "###...........................",
            "###...........................",
            "###...........................",  
            "###...........................",
            "##............................", 
            "##............................",
            "##...........................#",
            "#...........................##",  
            "#............................#",
            "#.............................", 
            "..........................3P..",
            "..............3P..............",
            "..........................####",  
            ".@..........#####......#######",
            ".§.........######...##########", 
            "####.......######...##########",
            "####.......######...##########",
        ],
    },
    {
        map: [//8
            "######................########",  
            "####...................#######",
            "####.....................#####", 
            "###.............P........#####",
            "###.......................####",
            "###............2..........####",  
            "###........................###",
            "##.............##..........###", 
            "##.............##..........###",
            "##..............#..........###",
            "#...........................##",  
            "#............................#",
            "#............................#", 
            "..............................",
            "..............................",
            "..............................",  
            ".@..........................P.",
            ".§.............#..............", 
            "###............##..........###",
            "####..........###..........###",
        ],
    },
    {
        map: [//7
            "..........################..##",           
            "..........###############...##",
            "...........###########......##",
            ".@.......#..........1.....2..#",
            ".§B.....##......P......###...#",
            "###.....###..........####....#",
            "###....##################...##",
            "###....###############.....###",
            "##.....#######..............##",
            ".......######..P.1.....###..H#",
            "......########..........######",
            "......###.############..######",
            "......###..##########....#####",
            ".....####..#########..........",
            ".....###...##....##...........",
            ".....###P..#..................",
            ".....###...................1P.",
            "....#####2..##................",
            "....#####..#############.#####",
            "....###################..#####",
        ],
        helps: ["such skill."],
    },
    {
        map: [//6
            "........###############.......",
            "........###############.......",
            ".........############.........",
            ".@........##########........P.",
            ".§........####..###...........",
            "###........##...###........###",
            "###........##..............###",
            "###.....................B..###",
            "##.........2...P............##",
            "##............................",
            "##...........................",
            "##......###..#####..##........",
            "#......####...###.2.###.......",
            "#......####.........###.......",
            "#......######..P..######......",
            "##....########..H#######......",
            "##....##################......",
            "###...###################.....",
            "###...###################.....",
            "###..####################.....",
        ],
        helps: ["I'm stuck!"],
    },
    {
        map: [//5
            "..............................",
            "..............................",
            "..............................",
            ".@..........................P.",
            ".§............................",
            "###.......................####",
            "###...................########",
            "###..................H########",
            "##...........P.......#########",
            ".....................####...##",
            ".........B..###.......##.....#",
            "............####..........P..#",
            "...........#####..........1..#",
            "...........#####.............#",
            "...........###################",
            "...........###################",
            "..........####################",
            "..........####################",
            "..........####################",
            "..........####################",
        ],
        helps: ["Everyone can stand on the box."],
    },
    {
        map: [//4
            "..............................",
            "..............................",
            "..............................",
            "............................P.",
            "..............................",
            "#..........................###",
            "###......................#####",
            "###.......................####",
            "##............P.............##",
            "..............................",
            ".@............................",
            ".......B......................",
            ".§............................",
            "###...........................",
            "####..........................",
            "####..........................",
            "###...........................",
            "###...........................",
            "###H..........................",
            "#####.........................",
        ],
        helps: ["Only a true master can clear this gap!"],
    },
    {
        map: [//3
            "..............................",
            ".@............................",
            "..............................",
            "......................P.......",
            "#§............................",
            "###...........H.....H###....##",
            "###....B....####...######..###",
            "##...........#################",
            "##.............###############",
            "##...............####.........",
            "#.............................",
            "#...........................P.",
            "#H............................",
            "#####......................###",
            "#####.....................####",
            "####......................####",
            "###.......###.............####",
            "###......####..............###",
            "###......###...............###",
            "###.......##................##",
        ],
        helps: [
            "You can drag your mouse to move the box.", 
            "Or click anywhere to teleport it to where your mouse is.", 
            "Mind the gap!"
        ],
    },
    {
        map: [//2
            "..............................",
            "..............................",
            "..........................P...",
            ".@..........P.................",
            "............................##",
            "#§.........####..........#####",
            "###......#######...B...#######",
            "###......#######........######",
            "##.......#######........######",
            "##........######.........#####",
            "##........######.........#####",
            "##.......######..........#####",
            "###......######...........####",
            "###......######...........####",
            "##......#######...........####",
            "#.......########...........###",
            "#H......########...........###",
            "################...........###",
            "#################.........####",
            "#################........#####",
        ],
        helps: ["Wish ya good luck!"],
    },
    {
        map: [//1
            "..............................",
            "..............................",
            "...........................P..",
            "..............................",
            "......................########",
            "....................##########",
            "...............P....##########",
            "....................##########",
            "@...................##########",
            "...............B....##########",
            ".....................#########",
            "§...................H#########",
            "##................############",
            "##...........#################",
            "##...........#################",
            "##...........#################",
            "###.........##################",
            "####.......###################",
            "##############################",
            "##############################",
        ],
        helps: ["Click to teleport the the box around!"],
    },
];

levelTemplates.reverse();
difficultLevelTemplates.reverse();

export default levelTemplates;