/**
 * @abstract Раздел карточки
 * @enum {number}
 */
export enum CardTypes {
    /* Отчеты */
    REPORTS = 0,
    /* Подготовка */
    PREPARE = 1,
    /* Разработка */
    DEVELOPMENT = 2,
    /* Внедрение */
    INTRODUCTION = 3,
    /* Постмониторинг */
    POSTMONITOR = 4
}

/**
 * @abstract Имена разделов карточки
 */
export const CARD_TYPES_NAME = ["Отчеты", "Подготовка", "Разработка", "Внедрение", "Постмониторинг"];

/**
 * @abstract Имена файлов изображений (логотипов) разделов карточки
 */
export const CARD_TYPES_LOGO = [
    "logo_card_logs.png",
    "logo_card_prepare.png",
    "logo_card_dev.png",
    "logo_card_deploy.png",
    "logo_card_post.png"
];
