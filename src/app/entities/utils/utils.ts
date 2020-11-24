/**
 * Скачивает файлы по ссылке
 * @param uri - путь к ресурсу
 * @param filename - название файла для сохранения
 */
export function saveAs(uri, filename): void {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    link.click();
  } else {
    window.open(uri);
  }
}
