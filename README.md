# Wordpress Example 🎓

This repository contains a working example of a new project using [Bedrock](https://roots.io/bedrock/), the [Halland](https://github.com/RegionHalland/halland) theme and a local installation of our [Styleguide](https://github.com/regionhalland/styleguide). Use the code here as a reference or follow the installation guide to setup a new project.

## Requirements

Make sure you have these working requirements up and running on your computer. Read their respective documentation on how to get started.

* [Virtualbox](https://www.virtualbox.org/) >= v5.1.28 
* [Vagrant](https://www.vagrantup.com/) >= v2.0.2 
* [Composer](https://getcomposer.org/)
* [Homestead](https://laravel.com/docs/5.6/homestead) >= v5.6.0
* [Node](https://nodejs.org/en/) >= v6.0.0 
* [Yarn](https://yarnpkg.com/) >= v1.1.0 

## Installation

1. Clone a copy of this repository into your Homestead shared folder (should be `~/code/` if you followed the [Homestead installation guide](https://laravel.com/docs/5.6/homestead#installation-and-setup) and remove the `.git` directory:
```sh
$ git clone https://github.com/RegionHalland/wordpress-example.git
$ cd wordpress-example
$ rm -rf .git
```

2. Open up your `Homestead.yaml` file and define a new project and a new database under `sites:`. You can find the file in `~/Homestead/Homestead.yaml`:
```yaml
sites:
    ...
    - map: wordpress-example.test
      to: /home/vagrant/code/wordpress-example/web
...
databases:
  ...
  - wordpress-example
```

3. Provision your Homestead environment to make your changes take effect:
```sh
$ cd ~/Homestead/
$ homestead up && provision
```

4. Install dependencies with Composer. This will install [Halland](https://github.com/RegionHalland/halland) into `./web/app/themes/` and install [Advanced Custom Fields Pro](https://www.advancedcustomfields.com/pro/), which is required by the theme:
```sh
$ composer install
```

> ⚠️ If you got an error in step 4 saying `Fatal error: Class 'Dotenv\Dotenv' not found in ...` when running `composer install`, take a look at [this issue](https://github.com/RegionHalland/wordpress-example/issues/1) for a temporary solution.

5. If you go to [http://wordpress-example.test](http://wordpress-example.test) in your browser you should see **"Error establishing a database connection"**. We need to add environment variables to the `.env` file. In the root directory of wordpress-example, rename `.env.example ` to `.env` and open it up in your editor:
```sh
$ mv .env.example .env
```
In your `.env` file, fill out the following:
```
# Add your own ACF Pro key
ACF_PRO_KEY=<YOUR_ACF_PRO_KEY>

# Link to your local styleguide css file
COMPONENT_LIB_URL=http://styleguide.test/temp/css/main.min.css

DB_NAME=wordpress-example
DB_USER=homestead
DB_PASSWORD=secret

# Optional variables
DB_HOST=localhost
DB_PREFIX=wp_

WP_ENV=development
WP_HOME=http://wordpress-example.test
WP_SITEURL=${WP_HOME}/wp

# Generate your keys here: https://roots.io/salts.html
AUTH_KEY=')GBV2L5tPlCn]paK7QPx*J7a,MzMs+xqstpYV-5{|AsK:!u=q(xb>*c#3qXB^<f*'
SECURE_AUTH_KEY='VW_}%J&){AfnojG.Ezl2501[4Abw(VRrd@m.g.pr-S;<*E287>0+#5t]c:HJ3m}p'
LOGGED_IN_KEY='_7onI29^-@[$,(un)UPrgn_5/$lQ9%AR_8G>bKCZV=qYNOE^yELi2il3]3]n*#{}'
NONCE_KEY='wpY|wSN|ff+[3`[<n]k{V&W7,9K>Am2r_=*Y2TZ37DW8cZSWm&6QJ`CAH(&?2;&3'
AUTH_SALT='cQ[?`&#B[WSRN4EvK,tF{h5t70xv0t+uN^N0H:/|I2a$YK$jR9xBU4Za#v7kM@,1'
SECURE_AUTH_SALT='B67k]bLb4lMrJwaKx[4//V>*@@z!:KRy2rAAF,%g})_=8;t[:#DcQyS%#D8JAs$)'
LOGGED_IN_SALT='O`5^;8vn@43dVj^V)5$f@&X5?t.OhE9dE]>|WL%tta5Rl.$6yyC={Cld4^7&a$)!'
NONCE_SALT='BWC7/.+q*Qd1Qmwy67-Dy{Vs?tyzcsQkV$3f.$[-?X}Mw`XAWR],;sH@Y}SD5.X_'
```

6. If you refresh your browser at [http://wordpress-example.test](http://wordpress-example.test) you should see the Wordpress installation screen. Walk through the installation.

7. Go to [http://wordpress-example.test/wp/wp-admin](http://wordpress-example.test/wp/wp-admin) and login. Under **Plugins**, activate ACF Pro.

> ⚠️ It's important to do step 7 **before** activating the theme, or it will break. If you accidentally did, delete Halland from the themes folder and run `composer install` again.

8. Go to **Appearance → Themes** in the Wordpress admin panel and active **Halland**.

9. You will notice that styles are missing. Go to the [Styleguide repository](https://github.com/RegionHalland/styleguide) and follow the installation guide to setup the project.

10. Everything should be up and running! 🎉

## Development
TBD

