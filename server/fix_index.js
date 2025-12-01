const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/index.html');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const lines = data.split('\n');

    // Part 1: Keep lines 1-284 (Indices 0-283)
    // Line 284 is empty line after Skills section
    const part1 = lines.slice(0, 284);

    // Part 2: New Projects Section and Footer
    const part2 = [
        '        <section id="projects" class="py-20 bg-white dark:bg-gray-800">',
        '            <div class="container mx-auto px-4">',
        '                <h2 class="text-3xl font-bold text-center mb-10">Projects</h2>',
        '                <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">',
        '                    <!-- Projects will be loaded here via JavaScript -->',
        '                </div>',
        '            </div>',
        '        </section>',
        '    </main>',
        '',
        '    <!-- Footer -->',
        '    <footer class="bg-white dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">',
        '        <div class="container mx-auto px-4 text-center">',
        '            <p class="text-gray-600 dark:text-gray-400">&copy; 2023 Sudip Bhandari. All rights reserved.</p>',
        '        </div>',
        '    </footer>',
        ''
    ];

    // Part 3: Keep from line 489 to end (Index 488)
    // Line 489 is <!-- Project Details Modal -->
    const part3 = lines.slice(488);

    const newContent = [...part1, ...part2, ...part3].join('\n');

    fs.writeFile(filePath, newContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Successfully fixed index.html');
        }
    });
});
