# CS2游戏内设置对应指令



打游戏时突然蓝屏，然后电脑强制更新，重启后设置全变成默认。。。

为了后续方便在不同电脑上玩且在重装系统后能一键恢复设置，所以将原来的设置保存到cfg文件，最后加载cfg文件即可

cfg文件的后缀名为cfg，打开steam，库，右击cs2，属性，点击已安装文件，点击浏览，在文件夹中点击Counter-Strike Global Offensive\game\csgo\cfg

将cfg文件存放在以上位置，一般命名为autoexec.cfg，在steam的cs2启动项中输入`+exec autoexec.cfg`

以下参考[cs2指令网站](https://totalcsgo.com/commands)和[prosettings](https://prosettings.net/)对游戏内设置对应的指令进行整理，其中“视频”和“视频高级选项”无法使用命令设置，可以在“设置”内设置。对于指令取值可以在指令网站上查

## 视频设置

### 视频

| 项目 | 数值 |
|-------|-------|
| 显示模式|全屏 |
| 纵横比| 标准4:3|
| 分辨率|1440*1080 |
| 刷新率|144HZ |

| 设置名称 | 指令 | 
|-------|-------|
| 亮度|r_fullscreen_gamma |

### 高级视频选项

| 项目 | 数值 |
|-------|-------|
| 增强角色对比度|开 |
| V-Sync| 关|
| AMD Anti-Lag2.0|开 |
| 游戏最高FPS|500 |
| 菜单最高FPS| 200|
| 当前视频值预设|自定义 |
| 多重采样抗锯齿模式|4X MSAA |
|全局阴影效果 |高 |
| 动态阴影|全部 |
| 模型贴图细节|低 |
| 贴图过滤模式|双线性 |
| 光影细节|低 |
| 粒子细节|低 |
| 环境光遮蔽| 关|
| 高动态范围|品质 |
| Fidelity FX 超级分辨率| 关（最高品质）|


### HUD边缘位置

| 设置名称 | 指令 | 
|-------|-------|
|水平调整 | safezonex| 
| 垂直调整| safezoney| 



## 音频设置

### 音频

| 设置名称 | 指令 | 
|-------|-------|
|主音量 | volume|
| 主菜单环境音量|snd_menumap_volume | 
| 均衡器简介|snd_headphone_eq | 
|左/右声道独立 | snd_spatialize_lerp| 
|透视娇正 |snd_steamaudio_enable_perspective_correction | 
| 当游戏处于背景时播放音频| snd_mute_losefocus| 

### 语音

| 设置名称 | 指令 | 
|-------|-------|
| 其他玩家的语音音量| snd_voipvolume| 
| 语音/麦克风模式|voice_modenable | 
|监听我自己的声音 |voice_loopback | 
| 简化按键通话|voice_always_sample_mic | 
| 麦克风触发阈值| voice_threshold| 

### 音乐

| 设置名称 | 指令 | 
|-------|-------|
|主菜单音量 | snd_menumusic_volume| 
|回合开始音量 |snd_roundstart_volume | 
|回合开始行动音量 |snd_roundaction_volume | 
|回合结束音量 | snd_roundend_volume| 
|MVP 音量 | snd_mvp_volume| 
| 炸弹/人质音量|snd_mapobjective_volume | 
| 十秒警告音量| snd_tensecondwarning_volume| 
| 死亡视角音量|snd_deathcamera_volume | 
|当双方团队成员都存活时关闭MVP音乐 | snd_mute_mvp_music_live_players| 

## 游戏设置

### 游戏

| 设置名称 | 指令 | 
|-------|-------|
| 启用开发者控制台|con_enable | 
| 最大匹配延迟|mm_dedicated_search_maxping | 
| 最大游戏流量带宽|rate | 
| 缓冲以消除数据包丢失/抖动| cl_net_buffer_ticks| 
| 安装反恐精英创意工坊工具|install_dlc_workshoptools_cvar | 

### Hud

| 设置名称 | 指令 | 
|-------|-------|
|HUD 比例 |hud_scaling | 
| HUD 颜色|cl_hud_color | 
|玩家大计数 |cl_teamcounter_playercount_instead_of_avatars | 
|Steam 通知区域 |ui_steam_overlay_notification_position | 
|社区通知水平偏移 |ui_steam_overlay_notification_position_horz | 
|社区通知垂直偏移 | ui_steam_overlay_notification_position_vert| 
|按稀有度颜色显示武器发光效果 |cl_weapon_selection_rarity_color| 

### 团队

| 设置名称 | 指令 | 
|-------|-------|
|通过墙壁显示队伍ID| cl_teamid_overhead_mode| 
| 在竞技模式中显示玩家颜色|cl_teammate_colors_show | 
|在队伍ID上使用玩家颜色 |cl_teamid_overhead_colors_show | 
|好友房间默认权限|lobby_default_privacy_bits2 | 
|当反恐精英启动时寻找队友 |ui_setting_advertiseforhire_auto | 

### 通讯

| 设置名称 | 指令 | 
|-------|-------|
| 玩家标记|cl_player_ping_mute | 
|将敌方静音 | cl_mute_enemy_team| 
| 除好友外一律静音|cl_mute_all_but_friends_and_party | 
| 允许使用动态头像| cl_allow_animated_avatars| 
| 隐藏头像图片和自定义物品| cl_hide_avatar_images| 
| 清理玩家名称|cl_sanitize_player_names | 

### 观察者/记分板


| 设置名称 | 指令 | 
|-------|-------|
| 观察者/地图投票数字选择方式|spec_usenumberkeys_nobinds | 
| 启用计分板鼠标/比赛结束计分板切换|cl_scoreboard_mouse_enable_binding | 
|比赛结束本地玩家失败动画 | eom_local_player_defeat_anim_enabled| 
|总是显示生还者人数 | cl_scoreboard_survivors_always_on| 
|平滑观察者视角 | cl_obs_interp_enable| 
| 平滑观察者视角速度| cl_obs_interp_pos_rate| 

### 物品

| 设置名称 | 指令 | 
|-------|-------|
|狙击枪开枪后延迟开镜 | cl_sniper_delay_unscope|
| 开枪后狙击步枪自动重新开镜|cl_sniper_auto_rezoom|
| 卸下 M4A1-S和USP-S的消音器|cl_silencer_mode |
| 持枪视角| viewmodel_presetpos|
|首选左/右手持枪视角 | cl_prefer_lefthanded|
|第一人称追踪器 | r_drawtracers_firstperson|
| 总是显示库存|cl_showloadout |
| 按“使用”键打开购买菜单|cl_use_opens_buy_menu |
|购买菜单数字键位 | cl_buywheel_nonumberpurchasing|
|购买菜单捐赠快捷键 | cl_buywheel_donate_key|
| 装备轮盘上最近选择的武器|cl_quickinventory_lastinv |

### 雷达/平板

| 设置名称 | 指令 | 
|-------|-------|
| 雷达保持玩家居中| cl_radar_always_centered|
| 雷达旋转| cl_radar_rotate|
| 雷达HUD地图与背景融合| cl_hud_radar_map_additive|
|雷达HUD背景透明度 |cl_hud_radar_background_alpha |
|雷达 HUD大小 | cl_hud_radar_scale|
|雷达地图缩放 |cl_radar_scale |
| 雷达地图切换缩放| cl_radar_scale_alternate|
| 切换计分板外观| cl_radar_square_with_scoreboard|
| 雷达正在动态缩放|cl_radar_scale_dynamic |

### 准星

| 设置名称 | 指令 | 
|-------|-------|
| 准星风格|cl_crosshairstyle |
| 准星友军伤害警告| cl_crosshair_friendly_warning|
|跟随后坐力 | cl_crosshair_recoil|
| 中心点| cl_crosshairdot|
|长度 |cl_crosshairsize |
|粗细 |cl_crosshairthickness |
| 间隙| cl_crosshairgap|
| 轮廓|cl_crosshair_drawoutline |
| 轮廓大小| cl_crosshair_outlinethickness|
| 红色|cl_crosshaircolor_r |
| 绿色| cl_crosshaircolor_g|
| 蓝色| cl_crosshaircolor_b|
|透明度 |cl_crosshairusealpha |
|透明度大小 | cl_crosshairalpha|
| T形准星| cl_crosshair_t|
|启用准星间距设置 |cl_crosshairgap_useweaponvalue |
| 使用与准星相同颜色的瞄准镜圆点准星| cl_ironsight_usecrosshaircolor|
| 显示玩家所用准星| cl_show_observer_crosshair|
|观察电脑玩家时，显示我的准星 | cl_observed_bot_crosshair|

### 投掷物瞄点准星

| 设置名称 | 指令 | 
|-------|-------|
| 保持常规准星|cl_grenadecrosshair_keepusercrosshair |
| 闪光震撼弹| cl_grenadecrosshair_flash|
| 闪光震撼弹|cl_grenadecrosshairdelay_flash |
| 高爆手雷| cl_grenadecrosshair_explosive|
| 高爆手雷| cl_grenadecrosshairdelay_explosive|
| 燃烧瓶/燃烧弹| cl_grenadecrosshair_fire|
|燃烧瓶/燃烧弹 | cl_grenadecrosshairdelay_fire|
| 烟雾弹|cl_grenadecrosshair_smoke |
|烟雾弹 |cl_grenadecrosshairdelay_smoke |
|诱饵弹 | cl_grenadecrosshair_decoy|
|诱饵弹 |cl_grenadecrosshairdelay_decoy |

### 伤害预测

| 设置名称 | 指令 | 
|-------|-------|
|预测击中身体的效果 | cl_predict_body_shot_fx|
|预测爆头的效果 |cl_predict_head_shot_fx |
|预测击杀布娃娃效果 |cl_predict_kill_ragdolls |

### 遥测

| 设置名称 | 指令 | 
|-------|-------|
|显示顿间时间及 FPS | cl_hud_telemetry_frametime_show|
|帧间时间警告阈值 | cl_hud_telemetry_frametime_poor|
| 显示延迟| cl_hud_telemetry_ping_show|
|显示网络问题(由于丢失或抖动而错过的ticks) | cl_hud_telemetry_net_misdelivery_show|
|网络tick丢失率警告阈值 |cl_hud_telemetry_net_misdelivery_poor |
| 显示网络抖动/误差图| cl_hud_telemetry_net_quality_graph_show|
|使用详细的网络质量显示 | cl_hud_telemetry_net_detailed|


## 键盘/鼠标

### 键盘和鼠标设置

| 设置名称 | 指令 | 
|-------|-------|
| 反转鼠标| mouse_inverty|
|下蹲模式 | option_duck_method|
|行走模式 | option_speed_method|
| 按住缩放按钮|cl_debounce_zoom |
| 鼠标灵敏度|sensitivity |
|缩放灵敏度倍数 | zoom_sensitivity_ratio|


### 按键绑定

见我的cfg文件

## 持枪视角

见我的cfg文件

## 我的cfg

以下是2025.7.13的cfg文件

```cfg
// dungeon master

// ================= video =================

// ======= video =======

// fullscreen 4:3 1440*1080 144hz

r_fullscreen_gamma "2.2"  // 93%

// ======= advanced video =======

// ...

// ======= hud edge =======

safezonex "1"
safezoney "1"

// ================= audio =================

// ======= audio =======

volume "0.1" // 32%
snd_menumap_volume "1" // 100%
snd_headphone_eq "0"
snd_spatialize_lerp "0"
snd_steamaudio_enable_perspective_correction "1"
snd_mute_losefocus "1"

// ======= voice =======

snd_voipvolume "1"
voice_modenable "1"
voice_loopback "0"
voice_always_sample_mic "0"
voice_threshold "4000" // 4000

// ======= music =======

snd_menumusic_volume "0"
snd_roundstart_volume "0"
snd_roundaction_volume "0"
snd_roundend_volume "0"
snd_mvp_volume "0"
snd_mapobjective_volume "0"
snd_tensecondwarning_volume "0"
snd_deathcamera_volume "0"
snd_mute_mvp_music_live_players "0"


// ================= game =================

// ======= game =======

con_enable "1"
mm_dedicated_search_maxping "100"
rate "786432"
cl_net_buffer_ticks "0"
install_dlc_workshoptools_cvar "0"

// ======= hud =======

hud_scaling "1"
cl_hud_color "3" // light blue
cl_teamcounter_playercount_instead_of_avatars "0"
ui_steam_overlay_notification_position "topright"
ui_steam_overlay_notification_position_horz "0"
ui_steam_overlay_notification_position_vert "0"
cl_weapon_selection_rarity_color "0"

// ======= team =======

cl_teamid_overhead_mode "2" // pips, names, health
cl_teammate_colors_show "1"
cl_teamid_overhead_colors_show "1"
lobby_default_privacy_bits2 "0"
ui_setting_advertiseforhire_auto "1"

// ======= communication =======

cl_player_ping_mute "0"
cl_mute_enemy_team "0"
cl_mute_all_but_friends_and_party "0"
cl_allow_animated_avatars "1"
cl_hide_avatar_images "0"
cl_sanitize_player_names "0"

// ======= spectator and scoreboard =======

spec_usenumberkeys_nobinds "1"
cl_scoreboard_mouse_enable_binding "+attack2"
eom_local_player_defeat_anim_enabled "1"
cl_scoreboard_survivors_always_on "0"
cl_obs_interp_enable "1"
cl_obs_interp_pos_rate "0.27" // 0.27

// ======= item =======

cl_sniper_delay_unscope "0"
cl_sniper_auto_rezoom "1"
cl_silencer_mode "0"
viewmodel_presetpos "1" 
cl_prefer_lefthanded "0"
r_drawtracers_firstperson "1"
cl_showloadout "1"
cl_use_opens_buy_menu "1"
cl_buywheel_nonumberpurchasing "1"
cl_buywheel_donate_key "0"
cl_quickinventory_lastinv "0"

// ======= radar =======

cl_radar_always_centered "1"
cl_radar_rotate "1"
cl_hud_radar_map_additive "1"
cl_hud_radar_background_alpha "0.627"
cl_hud_radar_scale "1"
cl_radar_scale "0.7"
cl_radar_scale_alternate "1"
cl_radar_square_with_scoreboard "1"
cl_radar_scale_dynamic "0"

// ======= crosshair =======

cl_crosshairstyle "4"
cl_crosshair_friendly_warning "0"
cl_crosshair_recoil "0"
cl_crosshairdot "0"

cl_crosshairsize "1"
cl_crosshairthickness "1"
cl_crosshairgap "-4"
cl_crosshair_drawoutline "0"
cl_crosshair_outlinethickness "1"
cl_crosshaircolor_r "0"
cl_crosshaircolor_g "255"
cl_crosshaircolor_b "255"
cl_crosshairusealpha "1"
cl_crosshairalpha "255"
cl_crosshair_t "0"
cl_crosshairgap_useweaponvalue "0"
cl_ironsight_usecrosshaircolor "0"
cl_show_observer_crosshair "2"
cl_observed_bot_crosshair "0"


// ======= grenade line-up reticle =======

cl_grenadecrosshair_keepusercrosshair "1"
cl_grenadecrosshair_flash "1"
cl_grenadecrosshairdelay_flash "2"
cl_grenadecrosshair_explosive "1"
cl_grenadecrosshairdelay_explosive "2"
cl_grenadecrosshair_fire "1"
cl_grenadecrosshairdelay_fire "2"
cl_grenadecrosshair_smoke "1"
cl_grenadecrosshairdelay_smoke "2"
cl_grenadecrosshair_decoy "1"
cl_grenadecrosshairdelay_decoy "2"

// ======= damage prediction =======

cl_predict_body_shot_fx "0"
cl_predict_head_shot_fx "0"
cl_predict_kill_ragdolls "0"


// ======= telemetry =======

cl_hud_telemetry_frametime_show "2"
cl_hud_telemetry_frametime_poor "100"
cl_hud_telemetry_ping_show "2"
cl_hud_telemetry_net_misdelivery_show "2"
cl_hud_telemetry_net_misdelivery_poor "5"
cl_hud_telemetry_net_quality_graph_show "0"
cl_hud_telemetry_net_detailed "1"


// ================= keyboard and mouse =================

mouse_inverty "0"
option_duck_method "0"
option_speed_method "0"
cl_debounce_zoom "1"
sensitivity "2.3"
zoom_sensitivity_ratio "1"

// ======= movement =======


bind "w" "+forward" 
bind "s" "+back" 
bind "a" "+left" 
bind "d" "+right" 
bind "shift" "+sprint" 
bind "ctrl" "+duck" 
bind "space" "+jump" 
bind "mwheelup" "+jump"
bind "mwheeldown" "+jump"

// ======= weapon =======

bind "e" "+use" 
bind "mouse1" "+attack" 
bind "mouse2" "+attack2" 
bind "r" "+reload" 
bind "q" "lastinv" 
bind "g" "drop" 
bind "f" "+lookatweapon" 
bind "h" "switchhands" 
bind "b" "buymenu" 
bind "f1" "rebuy"
bind "1" "slot1"
bind "2" "slot2" 
bind "3" "slot3" 
bind "4" "slot4"
bind "z" "slot5"
bind "v" "slot6" 
bind "mouse5" "slot7" 
bind "mouse4" "slot8" 
bind "c" "slot10" 
bind "x" "noclip" 
bind "m" "+spray_menu"


// ======= ui =======

bind "tab" "+showscores" 
bind "`" "toggleconsole" 

// ======= chat =======

bind "mouse3" "player_ping"
bind "p" "radio"
bind "u" "messagemode2"
bind "y" "messagemode"
bind "t" "+voicerecord"

// ======= autobuy =======

bind "j" "buy ak47; buy m4a1; buy vesthelm; buy defuser;"
bind "n" "buy smokegrenade;buy flashbang;buy molotov;buy hegrenade;"

// ======= say and console =======

bind "k" "say_team !drop"
bind "l" "exec autoexec"
bind "f10" "quit"
bind "i" "sv_rethrow_last_grenade"
bind "o" "ent_fire smokegrenade_projectile kill; ent_fire flashbang_projectile kill; ent_fire hegrenade_projectile kill; ent_fire decoy_projectile kill; ent_fire inferno kill" 


// ================= launch option =================


// +exec autoexec.cfg



// ================= viewmodel =================

viewmodel_fov "60"
viewmodel_offset_x "1"
viewmodel_offset_y "1"
viewmodel_offset_z "-1"
```

## 其他设置

对于显示器设置和显卡设置，显示器设置看得舒服就行，显卡设置，我使用A卡，几乎没有设置
