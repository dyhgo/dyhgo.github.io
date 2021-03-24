# simplest colorful bash promt



```shell
######################### begin ###############################


bash_prompt() {

	
	
	
	
	
	local NO_FORMAT="\[\033[0m\]"
	local ORANGE_BOLD="\[\033[1;38;5;208m\]"
	local TOXIC_GREEN_BOLD="\[\033[1;38;5;118m\]"
	local RED_BOLD="\[\033[1;38;5;1m\]"
	local CYAN_BOLD="\[\033[1;38;5;87m\]"
	local BLACK_BOLD="\[\033[1;38;5;0m\]"
	local WHITE_BOLD="\[\033[1;38;5;15m\]"
	local GRAY_BOLD="\[\033[1;90m\]"
	local BLUE_BOLD="\[\033[1;38;5;74m\]"
	
	
	
	
	
	
	local PROMT_USER_COLOR=$CYAN_BOLD
	local PROMT_AT_COLOR=$WHITE_BOLD
	local PROMT_HOST_COLOR=$CYAN_BOLD
	local PROMT_COLON_COLOR=$WHITE_BOLD
	local PROMT_PATH_COLOR=$ORANGE_BOLD
	local PROMT_DOLLAR_COLOR=$WHITE_BOLD
	local PROMT_INPUT_COLOR=$TOXIC_GREEN_BOLD
	

	
	local PROMT_USER=$"$PROMT_USER_COLOR\u"
	local PROMT_AT=$"$PROMT_AT_COLOR@"
	local PROMT_HOST=$"$PROMT_HOST_COLOR\h"
	local PROMT_COLON=$"$PROMT_COLON_COLOR:"
	local PROMT_PATH=$"$PROMT_PATH_COLOR\w"
	local PROMT_DOLLAR=$"$PROMT_DOLLAR_COLOR$"
	local PROMT_INPUT=$"$PROMT_INPUT_COLOR"

	
	

	
	PS1="${PROMT_USER}${PROMT_AT}${PROMT_HOST}${PROMT_COLON}${PROMT_PATH}${PROMT_DOLLAR} ${PROMT_INPUT}"

	none="$(tput sgr0)"
	trap 'echo -ne "${none}"' DEBUG

	
}



bash_prompt
unset bash_prompt

################################# end ###############################
```




inspired by [https://github.com/ChrisTitusTech/scripts](https://github.com/ChrisTitusTech/scripts)



add the code to `~/.bashrc` and run `source ~/.bashrc`

you can rewrite `PS1` to make it more fancy, like time display,  graph



