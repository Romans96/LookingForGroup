const commands_it = [
    `⏬ __***Comandi Utente***__ ⏬`,
    `▶ **g!lfg -help**  🔹Mostra questo menù`,
    `▶ **g!lfg -rolelist**  🔹Mostra la lista dei ruoli utilizzabili per il LFG`,
    `▶ **g!lfg @ruolo**  🔹Attiva un ruolo nel proprio profilo per il LFG (usa \`g!lfg -listaruoli\` per visualizzare i ruoli usabili)`,
    `▶ **g!lfg -list nomeruolo**  🔹Mostra la lista degli utenti che hanno attivo quel certo ruolo in quel momento (usa \`g!lfg -roleslist\` per visualizzare il **NOME** da usare per listare gli utenti)`,

    `\n`,
    `⏬ __***Comandi Amministrazione***__ ⏬`,
    `▶ **g!lfg -config**  🔹Visualizza le configurazioni del Server per il Bot LFG`,
    `▶ **g!lfg -language identificativo_lingua (-> Es. it ; Identificatori disponibili: it, en)**  🔹Cambia la lingua del BOT nel Server attuale (2 caratteri -> Il Valore di default quando il Bot entra in un Server è: en (Inglese))`,
    `▶ **g!lfg -roletime durata_in_millisecondi (-> Es. 360000 = 5 minuti)** 🔹Cambia la durata massima per cui i ruoli LFG staranno attivi nel profilo di un utente `,
    `▶ **g!lfg -adminrole @ruolo**  🔹Configura il ruolo Admin (Solo il Creatore del Server può usare questo comando)`,
    `▶ **g!lfg -addrole @ruolo nome_personalizzato(-> Facoltativo))**  🔹Aggiunge un nuovo ruolo al database dell'LFG, con nome_personalizzato facoltativo (che può essere utilizzato per elencare gli utenti con quel ruolo. Guarda 'g!lfg -list nome_personalizzato)`,
    `▶ **g!lfg -editrole @ruolo nome_personalizzato(-> Obbligatorio))**  🔹Modifica il nome di un ruolo già registrato nel BOT`,
    `▶ **g!lfg -removerole @ruolo**  🔹Elimina un ruolo già registrato nel Database del Bot LFG`,
];
const commands_en = [
    `⏬ __***User Commands***__ ⏬`,
    `▶ **g!lfg -help**  🔹Show this menù`,
    `▶ **g!lfg -roleslist**  🔹Shows the list of usable roles for LFG`,
    `▶ **g!lfg @role**  🔹Activate a role in your profile for the LFG (use **g!lfg -roleslist** in order to view registered roles for your Server)`,
    `▶ **g!lfg -list rolename**  🔹Show the users list that have the tagged LFG role in their profile (use \`g!lfg -roleslist\` in order to show also the role **NAME** that you have to use to list the users)`,

    `\n`,
    `⏬ __***Administration Commands***__ ⏬`,
    `▶ **g!lfg -config**  🔹Show the Server configurations for the LFG Bot`,
    `▶ **g!lfg -language language_identifier(-> Ex. en ; Available Identifier: en, it)**  🔹Change the Bot Language in the actual Server (2 character -> Default when the Bot Joins a Server: en (English) )`,
    `▶ **g!lfg -roletime duration in milliseconds(-> Es. 360000 = 5 minutes)** 🔹Change the maximum duration for which LFG roles will be active in a user's profile `,
    `▶ **g!lfg -adminrole @role**  🔹Set the Admin Role (Only Server Owner can use this command)`,
    `▶ **g!lfg -role add personalized_name(-> Optional)**  🔹It adds a new role to the LFG Database, with an Optional personalized_name (that can be used to list users with that role in their profile. See 'g!lfg -list personalized_name' command)`,
    `▶ **g!lfg -role edit @role personalized_name(-> Obligatory)**  🔹Modify the role name, in a new personalized_name.`,
    `▶ **g!lfg -role remove @role**  🔹Delete a role from the LFG Bot Database`,
];

module.exports = {
    // index.js 
    "errordm": {
        "en": "It's not possible to utilize the BOT via Direct Mesage (DM)!",
        "it": "Non è possibile utilizzare il BOT via Messaggio Privato (DM)!"
    },
    "indexCmdErr": {
        "en": "The inserted command, it's not a part of the LFG Bot Commands!",
        "it": "Il comando da te digitato, non fa parte dei Comandi del Bot LFG!"
    },
    "indexUserNoRole": {
        "en": "In order to activate an LFG role, you must tag one of them that are registered on the LFG Database, that you can find digiting \`g!lfg -roleslist\`!",
        "it": "Per attivare un ruolo LFG, devi taggare uno dei ruoli registrati nel Database dell'LFG, che puoi trovare digitando \`g!lfg -roleslist\`!"
    },

    // Global Right Command Syntax message
    "rightsyntax": {
        "en": " Command executed correctly! ✔",
        "it": " Comando eseguito correttamente! ✔"
    },
    // Global Wrong Command Syntax message
    "wrongsyntax": {
        "en": " Wrong command syntax! ❌",
        "it": " Sintassi comando errata! ❌"
    },
    // Global Check Help Message (for embedError response)
    "checkhelp": {
        "en": "Use \`g!lfg -help\` in order to check the available commands!",
        "it": "Usa \`g!lfg -help\` per controllare i comandi disponibili!"
    },
    // Global check Help Message (Footer embedError)
    "footercheckhelp": {
        "en": "Use g!lfg -help in order to check the available commands!",
        "it": "Usa g!lfg -help per controllare i comandi disponibili!"
    },

    // checkAdmin Function
    "cmdNotExecuted": {
        "en": "❌ Command not executed!",
        "it": "❌ Comando non eseguito!",
    },
    "noAdmin": {
        "en": "You have not the permission to use this command!\nIt's necessary to be the Server Owner or to have the Admin role",
        "it": "Non hai il permesso per eseguire questo comando!\nE' necessario essere il Creatore del Server o avere il ruolo Admin",
    },

    /* ---------- Users Commands Translations ---------- */
    // ### lfg-list.js ~ RESPONSES ###
    "listErr": {
        "en": "Try again with **\`g!lfg -list rolename\`** in order to view the users who have actived that role in their profile!",
        "it": "Riprova con **\`g!lfg -list nomeruolo\`** per visualizzare gli utenti che hanno attivo tale ruolo nel profilo!",
    },
    "listFooterErr": {
        "en": "Use g!lfg -roleslist in order to view all the available roles in the Server and their related commands to list the users!",
        "it": "Usa g!lfg -roleslist per visualizzare tutti i ruoli disponibili sul Server e i relativi comandi per listare gli utenti!",
    },
    "nameNotRegistered": {
        "en": "The **NAME** of the indicated role is not present among the registered roles!",
        "it": "Il **NOME** del ruolo indicato non e' presente tra i ruoli registrati!",
    },
    "usersWithRole": {
        "en": "The following users currently have active, in their profile, the role",
        "it": "I seguenti utenti hanno attualmente attivo, nel proprio profilo, il ruolo",
    },
    "usersWithoutRole": {
        "en": "No user currently has active, in his profile, the role",
        "it": "Nessun utente ha attualmente attivo, nel proprio profilo, il ruolo",
    },

    // ### lfg-roleslist.js ~ RESPONSES ###
    "roleslistErr": {
        "en": "Try again with **\`g!lfg -roleslist\`** in order to view the available roles on the Server and their related commands to activate them in your profile!",
        "it": "Riprova con **\`g!lfg -roleslist\`** per visualizzare i ruoli disponibili nel Server e i relativi comandi per attivarli sul proprio profilo!",
    },
    "roleslistNoRoles": {
        "en": "Still no added role for this Server!",
        "it": "Ancora nessun ruolo aggiunto per questo Server!",
    },
    "roleslistMexList": {
        "en": "⏬ Available roles list for this Server ⏬",
        "it": "⏬ Lista ruoli disponibili per il Server ⏬",
    },
    "usersListCmd": {
        "en": "Command to list the users with that role",
        "it": "Comando per listare gli utenti con tale ruolo",
    },

    // ### lfg-user.js ~ RESPONSES ###
    "userErr": {
        "en": "Try again with **\`g!lfg @role\`** to activate a role on your profile!",
        "it": "Riprova con **\`g!lfg @ruolo\`** per attivare un ruolo sul tuo profilo!",
    },
    "userRoleErr": {
        "en": "Wrong role or it isn\'t among the available roles that you can choose!",
        "it": "Ruolo errato o non è presente tra i ruoli disponibili da scegliere!"
    },
    "userRoleActive": {
        "en": "already activated, you have to remove this in order to activate an other one!",
        "it": "già attivo, rimuovi quest'ultimo per ottenerne un altro!",
    },
    "userRoleRemoved": {
        "en": "correctly removed from your profile!",
        "it": "rimosso correttamente dal tuo profilo!",
    },
    "userRoleActived": {
        "en": "correctly activated!\nIn order to remove the role bofere the Timer ends, you can digit again",
        "it": "attivato correttamente!\nPer rimuovere il ruolo prima della fine del Timer digitare nuovamente",
    },
    "activedFor": {
        "en": "Active for",
        "it": "Attivo per",
    },
    "untilTo": {
        "en": "until to",
        "it": "fino alle",
    },
    "": {
        "en": "",
        "it": "",
    },

    // ### lfg-help.js ~ RESPONSE ###
    "help": {
        "en": commands_en.map(i => i + "\n"),
        "it": commands_it.map(i => i + "\n")
    },

    /* ---------- Admin Commands Translations ---------- */
    // ### lfg-config.js ~ RESPONSES ###
    "server-config": {
        "en": "Configurations for the following Server \n **Name",
        "it": "Configurazioni per il seguente Server \n **Nome",
    },
    "prefix": {
        "en": "LFG Prefix",
        "it": "Prefisso LFG",
    },
    "adminrole": {
        "en": "Admin Role",
        "it": "Ruolo Admin",
    },
    "roletime": {
        "en": "LFG role Duration",
        "it": "Durata ruolo LFG",
    },
    "language": {
        "en": "Server Language",
        "it": "Lingua Server",
    },
    "regrole": {
        "en": "Registered roles on the Server",
        "it": "Ruoli registrati nel Server",
    },
    "roleslist": {
        "en": "Available LFG roles list on the Server",
        "it": "Elenco dei ruoli LFG disponibili per il Server",
    },
    "regserver": {
        "en": "Served Servers from LFG",
        "it": "Server serviti da LFG",
    },
    "roleActivator": {
        "en": "can be activated on your profile with the command",
        "it": "attivabile sul proprio profilo con il comando",
    },

    // ### lfg-roletime.js ~ RESPONSES ###
    "roleTimeErr": {
        "en": "Try again with \`g!lfg -roletime (number in milliseconds - at least 10000)\` in order to modify the LFG roles duration on the Server!",
        "it": "Riprova con \`g!lfg -roletime (numero in millisecondi - almeno 10000)\` per modificare la durata dei ruoli LFG nel Server!",
    },
    "timeSet": {
        "en": "LFG roles duration setted on",
        "it": "Durata ruoli LFG impostato su",
    },

    // ### lfg-language.js ~ RESPONSES ###
    "languageErr": {
        "en": "Try again with \`g!lfg -language (2 chars of the language - Ex. en)\` in order to modify the LFG Bot language into the Server!",
        "it": "Riprova con \`g!lfg -language (2 caratteri della lingua - Es. it)\` per modificare la lingua del Bot LFG nel Server!",
    },
    "noLang": {
        "en": "Inserted Language not available. Try again with one of these",
        "it": "Lingua inserita non disponibile. Riprovare con una di queste",
    },
    "settedLang": {
        "en": "New Server language",
        "it": "Nuova lingua del Server",
    },

    // ### lfg-adminrole.js ~ RESPONSES ###
    "checkOwner": {
        "en": "You have not the permission to use this command!\nIt's necessary to be the Server Owner",
        "it": "Non hai il permesso per eseguire questo comando!\nE' necessario essere il Creatore del Server",
    },
    "adminRoleErr": {
        "en": "Try again with \`g!lfg -adminrole @adminrole\` in order to modify the Admin role of the LFG Bot into the Server!",
        "it": "Riprova con \`g!lfg -adminrole @ruoloadmin\` per modificare il ruolo Admin del Bot LFG nel Server! ",
    },
    "settedAdminRole": {
        "en": "Admin Role of the LFG Bot correctly setted to",
        "it": "Ruolo Admin del Bot LFG correttamente impostato su",
    },

    // ### lfg-role.js ~ RESPONSES ###
    "roleErr": {
        "en": "Try again with \`g!lfg -role (add, edit o remove) @role personalized_name (only add or edit\` (for the \`add\` option the personalized_name is optional, for the \`edit\` option the personalized_name in which to modify in is obligatory!)",
        "it": "Riprova con \`g!lfg -role (add, edit o remove) @ruolo nome_personalizzato (solo add o edit)\` (per l\'opzione \`add\` il nome_personalizzato è facoltativo, per l\'opzione \`edit\` il nome_personalizzato in cui modificarlo è obbligatorio!).",
    },
    "roleNotReg": {
        "en": "LFG Role not register for the Server. Use \`g!lfg -role -add @role personalized_name(optional)\` in order to add a new LFG role!",
        "it": "Ruolo LFG non registrato per il Server. Usa \`g!lfg -role -add @ruolo nome_personalizzato(facoltativo)\` per aggiungere un nuovo ruolo LFG!",
    },
    "roleAlreadyReg": {
        "en": "LFG Role alreay added for the Server. Use \`g!lfg -role edit @role personalized_name\` in order to modify the role name or use \`g!lfg -role remove @role\` to remove from the LFG roles!",
        "it": "Ruolo LFG già presente per il Server. Usa \`g!lfg -role edit @ruolo nome_personalizzato\` per modificare il nome del ruolo o \`g!lfg -role remove @ruolo\` per eliminarlo dai ruoli LFG!",
    },
    "roleAdded": {
        "en": "Added new role at the LFG Bot",
        "it": "Aggiunto nuovo ruolo all'LFG Bot",
    },
    "rolePersonalizedName": {
        "en": "with the name",
        "it": "con il nome",
    },
    "roleModifiedName": {
        "en": "Modified the name of the LFG role",
        "it": "Modificato il nome del ruolo LFG",
    },
    "roleIn": {
        "en": "into",
        "it": "in",
    },
    "roleEliminated": {
        "en": "Correctly elminated the following role and related name from the LFG Bot!",
        "it": "Eliminato correttamente il ruolo e il relativo nome personalizzato dal Bot LFG!",
    },
    "roleNoParam": {
        "en": "Wrong inserted parameter. It can only be one of these: \`add\`, \`edit\`, \`remove\`",
        "it": "Il parametro inserito è errato. Può essero solo uno tra questi: \`add\`, \`edit\`, \`remove\` ",
    },


    

    
    "": {
        "en": "",
        "it": "",
    },
}