<?php
  
  namespace App;



  class Routes{
    private $routes;

    public function __construct(){
      $this->initRoutes();
      $this->Run( $this->get_url() );
    }

    public function get_url(){
      return  parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH) ;
    }

    public function initRoutes(){



      //adm
      $routes['show_client']= array(
        "route"=>"/showadmclient",
        "controller"=>"AdmController",
        "action"=>"obterCadastroCliente"
      );

      $routes['show_client_lgpd']= array(
        "route"=>"/showclientlgpd",
        "controller"=>"AdmController",
        "action"=>"exibirTarefaConfere"
      );

      $routes['show_client_auth']= array(
        "route"=>"/showclientauth",
        "controller"=>"AdmController",
        "action"=>"exibirAuth"
      );

      $routes['update_adm_credentials']= array(
        "route"=>"/updateadmcredentials",
        "controller"=>"PlatformSettingsController",
        "action"=>"updateAdmCredentials"
      );

      $routes['alter_adm_credentials']= array(
        "route"=>"/alteradmcredentials",
        "controller"=>"PlatformSettingsController",
        "action"=>"alterAdmCredentials"
      );

      $routes['delete_adm_credentials']= array(
        "route"=>"/deleteadmcredentials",
        "controller"=>"PlatformSettingsController",
        "action"=>"deleteAdmCredentials"
      );

      /*end adm*/


      $routes['backup_db']= array(
        "route"=>"/backupdb",
        "controller"=>"AuthController",
        "action"=>"backup"
      );


      $routes['ret_teste']= array(
        "route"=>"/req",
        "controller"=>"AuthController",
        "action"=>"req"
      );



      $routes['portifolio']= array(
        "route"=>"/",
        "controller"=>"AuthController",
        "action"=>"portifolio"
      );

      $routes['portifolio_remake']= array(
        "route"=>"/portifolio",
        "controller"=>"AuthController",
        "action"=>"portifolio_two"
      );


      // $routes['index']= array(
      //   "route"=>"/",
      //   "controller"=>"AuthController",
      //   "action"=>"index"
      // );

      $routes['login']= array(
        "route"=>"/login",
        "controller"=>"AuthController",
        "action"=>"login"
      );

      // $routes['is_session_active']= array(
      //   "route"=>"/issessionactive",
      //   "controller"=>"AuthController",
      //   "action"=>"isSectionActive"
      // );



      $routes['authenticate']= array(
        "route"=>"/authenticate",
        "controller"=>"AuthController",
        "action"=>"authenticate"
      );

      $routes['loginforuser']= array(
        "route"=>"/loginforuser",
        "controller"=>"AuthController",
        "action"=>"loginForUser"
      );

      $routes['home']= array(
        "route"=>"/home",
        "controller"=>"AuthController",
        "action"=>"home"
      );

      //

      $routes['message']= array(
        "route"=>"/message",
        "controller"=>"MessageController",
        "action"=>"index"
      );



      //receba index
      $routes['receba']= array(
        "route"=>"/receba",
        "controller"=>"RecebaController",
        "action"=>"Index"
      );

    
      //receba
      $routes['receba-read']= array(
        "route"=>"/receba-read",
        "controller"=>"RecebaController",
        "action"=>"Read"
      );

      $routes['receba-create']= array(
        "route"=>"/receba-create",
        "controller"=>"RecebaController",
        "action"=>"Create"
      );

      $routes['receba-edit']= array(
        "route"=>"/receba-edit",
        "controller"=>"RecebaController",
        "action"=>"Update"
      );


      $routes['receba-delete']= array(
        "route"=>"/receba-delete",
        "controller"=>"RecebaController",
        "action"=>"Delete"
      );


      
      $routes['receba-archive']= array(
        "route"=>"/receba-archive",
        "controller"=>"RecebaController",
        "action"=>"Archive"
      );


      $routes['receba-archived']= array(
        "route"=>"/receba-archived",
        "controller"=>"RecebaController",
        "action"=>"ReadArchived"
      );

       
      $routes['receba-unarchive']= array(
        "route"=>"/receba-unarchive",
        "controller"=>"RecebaController",
        "action"=>"Unarchive"
      ); 


      $routes['receba-add-description']= array(
        "route"=>"/add-description",
        "controller"=>"RecebaController",
        "action"=>"addDescription"
      ); 

      $routes['receba-del-description']= array(
        "route"=>"/delete-description",
        "controller"=>"RecebaController",
        "action"=>"deleteDescription"
      ); 

      $routes['receba-up-description']= array(
        "route"=>"/upd-description",
        "controller"=>"RecebaController",
        "action"=>"updateDescription"
      ); 


        /*
        Adedonha
      */


      $routes['adedonha']= array(
        "route"=>"/adedonha",
        "controller"=>"AdedonhaController",
        "action"=>"Index"
      );

      $routes['adedonha_jogadores']= array(
        "route"=>"/jogadores",
        "controller"=>"AdedonhaController",
        "action"=>"getPlayer"
      );

      $routes['enviar-palavra']= array(
        "route"=>"/enviar-palavra",
        "controller"=>"AdedonhaController",
        "action"=>"enviarPalavra"
      );

      $routes['buscar-palavra']= array(
        "route"=>"/buscar-palavra",
        "controller"=>"AdedonhaController",
        "action"=>"buscarPalavra"
      );

      //rescue
      $routes['rescueaccount']= array(
        "route"=>"/rescueaccount",
        "controller"=>"PlatformAccountRescueController",
        "action"=>"rescueAccount"
      );

      $routes['getrescuelink']= array(
        "route"=>"/getrescuelink",
        "controller"=>"PlatformAccountRescueController",
        "action"=>"getRescueLink"
      );

      $routes['recover']= array(
        "route"=>"/recover",
        "controller"=>"PlatformAccountRescueController",
        "action"=>"recover"
      );

      $routes['newpasswordaccount']= array(
        "route"=>"/newpasswordaccount",
        "controller"=>"PlatformAccountRescueController",
        "action"=>"newPasswordAccount"
      );


      //activation
      $routes['activation']= array(
        "route"=>"/activation",
        "controller"=>"ActivationController",
        "action"=>"activate"
      );

      $routes['update_status_user_platform']= array(
        "route"=>"/updateuserstatusplatform",
        "controller"=>"AppController",
        "action"=>"UpdateUserStatus"
      );


      $routes['generatekeys']= array(
        "route"=>"/generatekeys",
        "controller"=>"ActivationController",
        "action"=>"generateActivationKeys"
      );

      $routes['saveactivationkey']= array(
        "route"=>"/saveactivationkey",
        "controller"=>"ActivationController",
        "action"=>"saveActivationKey"
      );

      

      $routes['logout']= array(
        "route"=>"/logout",
        "controller"=>"AuthController",
        "action"=>"logout"
      );

      $routes['settings']= array(
        "route"=>"/settings",
        "controller"=>"AppController",
        "action"=>"setting"
      );

      $routes['settings_admin']= array(
        "route"=>"/settingsadmin",
        "controller"=>"AppController",
        "action"=>"settingsAdmin"
      );

      


      $routes['brainstorm']= array(
        "route"=>"/brainstorm",
        "controller"=>"BrainstormController",
        "action"=>"brainstorm"
      );

      $routes['documentation']= array(
        "route"=>"/documentation",
        "controller"=>"DocumentationController",
        "action"=>"documentation"
      );

      $routes['changelog']= array(
        "route"=>"/changelog",
        "controller"=>"DocumentationController",
        "action"=>"changelog"
      );

      

      $routes['create']= array(
        "route"=>"/create",
        "controller"=>"DbController",
        "action"=>"create"
      );

      $routes['read']= array(
        "route"=>"/read",
        "controller"=>"DbController",
        "action"=>"read"
      );

      $routes['update']= array(
        "route"=>"/update",
        "controller"=>"DbController",
        "action"=>"update"
      );

      $routes['delete']= array(
        "route"=>"/delete",
        "controller"=>"DbController",
        "action"=>"delete"
      );


      //textos modelo

      $routes['read_users_models']= array(
        "route"=>"/read_users_models",
        "controller"=>"UsersTextModelsController",
        "action"=>"read"
      );


      $routes['create_users_models']= array(
        "route"=>"/create_users_models",
        "controller"=>"UsersTextModelsController",
        "action"=>"create"
      );


      $routes['delete_users_models']= array(
        "route"=>"/delete_users_models",
        "controller"=>"UsersTextModelsController",
        "action"=>"delete"
      );

      $routes['update_users_models']= array(
        "route"=>"/update_users_models",
        "controller"=>"UsersTextModelsController",
        "action"=>"update"
      );

      $routes['text_model_store']= array(
        "route"=>"/textmodelstore",
        "controller"=>"PlatformSettingsController",
        "action"=>"TextModelScriptStore"
      );


      //pendencias
      $routes['create_pending']= array(
        "route"=>"/create_pending",
        "controller"=>"SavedPendingController",
        "action"=>"create"
      );

      $routes['read_pending']= array(
        "route"=>"/read_pending",
        "controller"=>"SavedPendingController",
        "action"=>"read"
      );


      //platform
      $routes['/get_platform_settings']= array(
        "route"=>"/getplatformsettings",
        "controller"=>"PlatformSettingsController",
        "action"=>"getplatformsettings"
      );

      $routes['/apply_platform_settings']= array(
        "route"=>"/applyplatformsettings",
        "controller"=>"PlatformSettingsController",
        "action"=>"applyplatformsettings"
      );

      $routes['/update_platform_settings']= array(
        "route"=>"/updateplatformsettings",
        "controller"=>"PlatformSettingsController",
        "action"=>"updateplatformsettings"
      );

      // ADICIONE AS NOVAS ROTAS AQUI:
      $routes['upload_image_misc'] = array(
        "route" => "/imagemisc",
        "controller" => "PlatformSettingsController",
        "action" => "UploadImageMisc"
      );

      $routes['get_images_misc'] = array(
        "route" => "/getimagesmisc", 
        "controller" => "PlatformSettingsController",
        "action" => "GetImagesMisc"
      );

      $routes['delete_image_misc'] = array(
        "route" => "/deleteimagesmisc",
        "controller" => "PlatformSettingsController", 
        "action" => "DeleteImageMisc"
      );

      //LinksController
      $routes['create_link']= array(
        "route"=>"/create_link",
        "controller"=>"LinksController",
        "action"=>"create"
      );

      $routes['read_link']= array(
        "route"=>"/read_link",
        "controller"=>"LinksController",
        "action"=>"read"
      );

      $routes['delete_link']= array(
        "route"=>"/delete_link",
        "controller"=>"LinksController",
        "action"=>"delete"
      );

      


      //Shortcuts
      $routes['read_shortcut']= array(
        "route"=>"/read_shortcut",
        "controller"=>"ShortcutsController",
        "action"=>"read"
      );



      //templates Categories
      $routes['read_template_cat']= array(
        "route"=>"/readtemplatecat",
        "controller"=>"CategoryController",
        "action"=>"read"
      );

      $routes['del_template_cat']= array(
        "route"=>"/del_template_cat",
        "controller"=>"CategoryController",
        "action"=>"delete"
      );


      //suggestions
      $routes['create_suggestion']= array(
        "route"=>"/create_suggestion",
        "controller"=>"SuggestionsController",
        "action"=>"create"
      );

      $routes['read_suggestion']= array(
        "route"=>"/read_suggestion",
        "controller"=>"SuggestionsController",
        "action"=>"read"
      );

  
      $routes['update_suggestion']= array(
        "route"=>"/update_suggestion",
        "controller"=>"SuggestionsController",
        "action"=>"update"
      );

      $routes['delete_suggestion']= array(
        "route"=>"/delete_suggestion",
        "controller"=>"SuggestionsController",
        "action"=>"delete"
      );

      $routes['update_admin_response']= array(
        "route"=>"/update-admin-response",
        "controller"=>"SuggestionsController",
        "action"=>"updateAdminResponse"
      );

      


      // Verificação de protocolos
      $routes['ver_prot']= array(
        "route"=>"/verprot",
        "controller"=>"VerProtController",
        "action"=>"verProt"
      );


      //profile      
      $routes['update_username']= array(
        "route"=>"/updateusername",
        "controller"=>"ProfileController",
        "action"=>"update"
      );
      $routes['update_name']= array(
        "route"=>"/updatename",
        "controller"=>"ProfileController",
        "action"=>"update"
      );
      $routes['update_password']= array(
        "route"=>"/updatepassword",
        "controller"=>"ProfileController",
        "action"=>"update"
      );
      $routes['update_email']= array(
        "route"=>"/updateemail",
        "controller"=>"ProfileController",
        "action"=>"update"
      );

      $routes['send_email']= array(
        "route"=>"/sendmail",
        "controller"=>"PlatformMailController",
        "action"=>"sendMailHandler"
      );


      $routes['get_mail_status']= array(
        "route"=>"/get-mail-status",
        "controller"=>"PlatformMailController",
        "action"=>"getMailStatus"
      );

      $routes['email_loop']= array(
        "route"=>"/email-loop",
        "controller"=>"PlatformMailController",
        "action"=>"email_loop"
      );

      $routes['delete_email_queue']= array(
        "route"=>"/deleteemailqueue",
        "controller"=>"PlatformMailController",
        "action"=>"deleteEmailQueue"
      );

        /* Obtém as informações do usuário*/
      $routes['enable_background']= array(
        "route"=>"/enablebackground",
        "controller"=>"ProfileController",
        "action"=>"update"
      );
      $routes['update_background']= array(
        "route"=>"/updatebackground",
        "controller"=>"ProfileController",
        "action"=>"update"
      );
      $routes['apply_dark_theme']= array(
        "route"=>"/applydarktheme",
        "controller"=>"ProfileController",
        "action"=>"update"
      );

      $routes['update_bg_status']= array(
        "route"=>"/updatebgstatus",
        "controller"=>"ProfileController",
        "action"=>"updateBgStatus"
      );

      $routes['update_theme_mode_status']= array(
        "route"=>"/updatethememodestatus",
        "controller"=>"ProfileController",
        "action"=>"updateThemeModestatus"
      );

      
      
      $routes['user_profile']= array(
        "route"=>"/userprofile",
        "controller"=>"ProfileController",
        "action"=>"getUserProfile"
      );
      //updateProfile
      $routes['update_user_theme']= array(
        "route"=>"/updateusertheme",
        "controller"=>"ProfileController",
        "action"=>"updateUserTheme"
      );

      $routes['updateImageWeb']= array(
        "route"=>"/updateimageweb",
        "controller"=>"ProfileController",
        "action"=>"updateImageWeb"
      );

      

      $routes['update_photo_profile']= array(
        "route"=>"/updatephotoprofile",
        "controller"=>"ProfileController",
        "action"=>"updatePhotoProfile"
      );


      $routes['set_team']= array(
        "route"=>"/setteam",
        "controller"=>"platformTeamsController",
        "action"=>"createTeam"
      );

      $routes['get_team']= array(
        "route"=>"/getteam",
        "controller"=>"platformTeamsController",
        "action"=>"getTeam"
      );

      $routes['update_team']= array(
        "route"=>"/updateteam",
        "controller"=>"platformTeamsController",
        "action"=>"updateTeam"
      );

      $routes['delete_team']= array(
        "route"=>"/deleteteam",
        "controller"=>"platformTeamsController",
        "action"=>"deleteTeam"
      );

      //category
      $routes['set_category']= array(
        "route"=>"/setcategory",
        "controller"=>"PlatformCategoriesController",
        "action"=>"createScriptCategory"
      );
      
      $routes['get_category']= array(
        "route"=>"/getcategory",
        "controller"=>"PlatformCategoriesController",
        "action"=>"getScriptCategory"
      );

      $routes['updatescriptcategory']= array(
        "route"=>"/updatecategory",
        "controller"=>"PlatformCategoriesController",
        "action"=>"updateScriptCategory"
      );


      $routes['deletescriptcategory']= array(
        "route"=>"/deletecategory",
        "controller"=>"PlatformCategoriesController",
        "action"=>"deleteScriptCategory"
      );


      $routes['set_user']= array(
        "route"=>"/setuser",
        "controller"=>"ProfileController",
        "action"=>"setUser"
      );

      $routes['getuser']= array(
        "route"=>"/getusers",
        "controller"=>"ProfileController",
        "action"=>"getUsers"
      );

      $routes['get_sessions']= array(
        "route"=>"/getsessions",
        "controller"=>"AppController",
        "action"=>"getSessions"
      );


      $routes['delete_session']= array(
        "route"=>"/deletesession",
        "controller"=>"AppController",
        "action"=>"deleteSessions"
      );


      //getLongScript

      $routes['getlongscript']= array(
        "route"=>"/getlongscript",
        "controller"=>"PlatformTeamsController",
        "action"=>"getlongscript"
      );

      //alarm
      $routes['set_alarm']= array(
        "route"=>"/setalarm",
        "controller"=>"PlatformAlarmController",
        "action"=>"setAlarm"
      );

      $routes['get_alarms']= array(
        "route"=>"/getalarms",
        "controller"=>"PlatformAlarmController",
        "action"=>"getAlarm"
      );

      $routes['up_alarm']= array(
        "route"=>"/upalarm",
        "controller"=>"PlatformAlarmController",
        "action"=>"updatAlarm"
      );

      $routes['del_alarm']= array(
        "route"=>"/delalarm",
        "controller"=>"PlatformAlarmController",
        "action"=>"deleteAlarm"
      );

      //notificações
      $routes['get_all_notifications']= array(
        "route"=>"/getallnotifications",
        "controller"=>"PlatformNotificationsController",
        "action"=>"getAllNotifications"
      );

      $routes['get_notifications']= array(
        "route"=>"/getnotifications",
        "controller"=>"PlatformNotificationsController",
        "action"=>"getUnreadNotifications"
      );

      $routes['mark_notifications_read']= array(
        "route"=>"/marknotificationsasread",
        "controller"=>"PlatformNotificationsController",
        "action"=>"markNotificationsAsRead"
      );

      $routes['saveNotification']= array(
        "route"=>"/savenotification",
        "controller"=>"PlatformNotificationsController",
        "action"=>"saveNotification"
      );

      $routes['delete_notification']= array(
        "route"=>"/delete-notification",
        "controller"=>"PlatformNotificationsController",
        "action"=>"deleteNotification"
      );

      $routes['edit_notification']= array(
        "route"=>"/edit-notification",
        "controller"=>"PlatformNotificationsController",
        "action"=>"updateNotification"
      );

      

      

      //users
      $routes['get_platform_users']= array(
        "route"=>"/getplatformusers",
        "controller"=>"PlatformCommunityController",
        "action"=>"getUsers"
      );

      $routes['get_platform_logs']= array(
        "route"=>"/getplatformlogs",
        "controller"=>"PlatformCommunityController",
        "action"=>"getUsersLogs"
      );

      $routes['community']= array(
        "route"=>"/community",
        "controller"=>"AuthController",
        "action"=>"community"
      );
 
      $routes['get_platform_fonts']= array(
        "route"=>"/getplatformfonts",
        "controller"=>"ProfileController",
        "action"=>"getFonts"
      );

      $routes['get_platform_color_schemes']= array(
        "route"=>"/getplatformcolorschemes",
        "controller"=>"ProfileController",
        "action"=>"getColorSchemes"
      );

      $routes['set_platform_fonts']= array(
        "route"=>"/updateplatformfonts",
        "controller"=>"ProfileController",
        "action"=>"updateFont"
      );

      $routes['set_platform_color_schemes']= array(
        "route"=>"/updateplatformcolorschemes",
        "controller"=>"ProfileController",
        "action"=>"updateColorScheme"
      );


      // Adicionando rota para iniciar o servidor WebSocket
      $routes['start-websocket'] = array(
        "route" => "/start-websocket",
        "controller" => "WebSocketsController",
        "action" => "startServer"
      );

      $routes['prot_pendentes'] = array(
        "route" => "/protpendentes",
        "controller" => "SavedPendingController",
        "action" => "getAllPending"
      );

      $routes['relatorio'] = array(
        "route" => "/relatorio",
        "controller" => "AuthController",
        "action" => "Report"
      );

        

      $this->setRoutes($routes); 
    }

    public function setRoutes($routes){
      $this->routes = $routes;
    }


    public function getRoutes(){
      return $this->routes;
    }



    public function Run($url){ 
      foreach( $this->getRoutes() as $key => $route){
          if($url == $route['route']){
              session_start();
                $class =   "App\\Controllers\\".ucfirst($route['controller']);
                $controller = new $class;
                $action =  $route['action'];
                $controller->$action();
              return ;
          }
      }  
      $controller = new \App\Controllers\AuthController();
      // $controller->index();
      $controller->Portifolio();

    }


  }

?>
