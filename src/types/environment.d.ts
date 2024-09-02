export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: 'local' | 'development' | 'production';
        }
    }
}