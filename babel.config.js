module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        'babel-preset-expo',     // Головний пресет Expo
        // '@babel/preset-react' // Зазвичай не потрібен окремо, бо babel-preset-expo вже містить підтримку React
      ],
      plugins: [
        // Якщо ви використовуєте Reanimated, воно вимагає свій плагін
        'react-native-reanimated/plugin',
        // Якщо використовуєте alias @/... і він не працює, додайте module-resolver
        // [
        //   'module-resolver',
        //   {
        //     extensions: ['.ts', '.tsx', '.js', '.json'],
        //     alias: {
        //       '@': './'
        //     }
        //   }
        // ]
      ],
    };
  };
  