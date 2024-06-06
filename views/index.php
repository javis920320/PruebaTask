<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Document</title>
</head>

<body class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">

    <h1 class="text-lg text-white text-center"> Lista de Tareas</h1>

    <section class="w-1/5 " style=" margin:0 auto; align-content: center;">
        <a href="/tasks/create"
         class="px-4 py-2 my-4 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400">
            + Crear Tarea
        </a>
        <?php if (!empty($tasks)) : ?>
            <ul>
                <?php foreach ($tasks as $task) : ?>
                    <li class="bg-gray-700 text-gray-300 flex rounded items-center justify-between px-4 py-2">
                        <div class="flex flex-col">
                            <h2 class='text-lg font-bold'><?= htmlspecialchars($task->title) ?></h2>
                            <p><?= htmlspecialchars($task->description) ?></p>
                        </div>
                        <div class="flex gap-2">
                            <button class="text-white hover:text-red-500 focus:outline-none" title="Eliminar">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4 5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1h2V5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1h2V5zm10 4a1 1 0 0 0 1 1h1v2h-1a1 1 0 0 0-1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7a1 1 0 0 0-1-1H3V7h1a1 1 0 0 0 1-1V5h10v4zm-8 7v1h2v-1H6zm4 0v1h2v-1h-2z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <button class="text-white hover:text-blue-500 focus:outline-none" title="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5 8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8zm1-3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM5 12a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1zm1 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM17 4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1 1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                                </svg>
                            </button>
                        </div>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php else : ?>
            <h1 class='text-white'>No hay tareas</h1>
        <?php endif; ?>
    </section>


</body>

</html>