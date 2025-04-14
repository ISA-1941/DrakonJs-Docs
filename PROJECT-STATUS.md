
---

## ⚙️ Antora

Собирается из файла `antora-playbook.yml`  
Публикуется в папку `public/`, автоматически заливается в `gh-pages`

- `start_page`: `drakonjs-docs::index.adoc`
- Текущая тема: стандартная, тёмная, из UI bundle
- Используется локальный UI: `./ui/ui-bundle.zip`

---

## 🚀 GitHub Actions

**Работает при каждом `git push` в ветку `main`**

Workflow: `.github/workflows/publish.yml`

- Сборка сайта с Antora
- Автопубликация в ветку `gh-pages` с помощью `peaceiris/actions-gh-pages`
- Требуется `GITHUB_TOKEN` с правами "Read and write" (настроено)

---

## 📦 Что трогать осторожно

| Папка/файл              | Статус       | Комментарий                         |
|------------------------|--------------|-------------------------------------|
| `docs-src/`            | ✅ активно    | Здесь вся книга                    |
| `antora-playbook.yml`  | ✅ активно    | Управляет сборкой                  |
| `ui/ui-bundle.zip`     | ✅ активно    | Настраивает внешний вид            |
| `.github/workflows/`   | ✅ активно    | Управляет публикацией              |
| `antora-ui-default/`   | 🔒 заархивировано | Переименовано, не используется     |
| `node_modules/`        | 🔒 не используется | Была временной, безопасно удалена |

---

## 🛡 Рекомендации

- ✍️ Все `.adoc`-файлы редактировать внутри `docs-src/modules/`
- 📸 Картинки — в папки `images/` соответствующих модулей
- 🧪 Проверка локально:  
  `npx antora antora-playbook.yml`
- 💾 Резервная копия:  
  `DrakonJs-Docs-OK-2025-03-27` на флешке

---

## 🏷 Git-тег точки восстановления

```bash
git tag site-ok-v1
git push origin site-ok-v1
