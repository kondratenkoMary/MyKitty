/**
 * @abstract Статус ответа rest-метода
 * @enum {number}
 */
export enum REST_STATE {
    /* Отсутствие статуса */
    NO = 0,
    /* Выполнено с ошибками */
    ERROR = 1,
    /* Успешно выполнено */
    OK = 2,
}