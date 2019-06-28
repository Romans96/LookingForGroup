# Role Looking For Group (LFG)
% Links

## About LFG

It's a Discord Bot that permit to group and search other people joining Server Personalized Roles, that can be setted by an Admin on the LFG Database, for a determinated time, in order to search a group using a taggable role.

```
Basically, you have to create the roles that you want to use to Search a Group, 
make it mentionable, and add it to the LFG Database to use it
```
- **Examples**:
  - **`g!lfg -role add @PC`** => I add to the LFG Database the PC Role (Admin Command);
  - **`g!lfg @PC`** => I Activate that role on my profile (for an Admin determinated time) and who will mention the role @PC for that time, he tags me


## Inviting the Bot
You cna invite the Bot going [HERE](https://discordapp.com/api/oauth2/authorize?client_id=578362712061378572&permissions=268958800&scope=bot)

## Base Commands
After you invited the LFG Bot on your Server, it automatically add your Guild/server into the LFG Database, and you can start using the Bot and his commands:
- Use **`g!lfg -help`** in order to show the list of all Available commands;

- Admin Commands (All the commands using to configure the Bot (Only users with Admin role can use them):
  - **`g!lfg -adminrole`** => Can be used only from the Server Owner. Set the Administration Role for the Server;
  - **`g!lfg -config`** => It shows the configuration Settings of the Server
  - **`g!lfg -language lang`** => Configure the language of the LFG Bot in the specific Server (For now the lang can be en or it)
  - **`g!lfg -roletime duration_in_milliseconds`** => It Sets the duration of all the LFG Roles, and how many times it rest actived in a profile
  - **`g!lfg -role add/edit/remove @role (personalized_name -> for add and edit)`** => It adds, edits, or remove a spefici role of the server, to the LFG Roles in the LFG Database
  
- Users Commands (All the commands that all the Users can use):
  - **`g!lfg @role`** => Adds a role to your profile
  - **`g!lfg -roleslist`** => it Shows all the roles available in the Server
  - **`g!lfg -list role_name`** => With the role_name setted on add command, you can list all players that have that role in that moment. (You can see the roles names seted on roleslist command)


## Bot Issues?
Contact the Developer on Discord (contact below), or open an Issue Discussione here on GitHub on the [Issue Tab](https://github.com/Romans96/LookingForGroup/issues)

## Developer
Romans96 ~ Discord Contact: Romans96#9381

