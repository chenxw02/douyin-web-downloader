module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'vue'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/vue'
    ],
    rules: {
        // 在这里添加你的自定义规则
    }
};
