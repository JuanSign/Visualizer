let array = [];
let sorting = false;
let speed = 100;

document.getElementById('speed-slider').addEventListener('input', function () {
    speed = 1000 - this.value;
});

function generateArray() {
    array = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100) + 1);
    renderArray();
}

function renderArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    const maxValue = Math.max(...array);
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${(value / maxValue) * 100}%`;
        bar.classList.add('bar');
        container.appendChild(bar);
    });
}

async function bubbleSort() {
    sorting = true;
    for (let i = 0; i < array.length - 1 && sorting; i++) {
        for (let j = 0; j < array.length - i - 1 && sorting; j++) {
            highlightBars(j, j + 1, 'green');
            await new Promise(resolve => setTimeout(resolve, speed));
            if (array[j] > array[j + 1]) {
                highlightBars(j, j + 1, 'red');
                await swap(j, j + 1);
            } else {
                highlightBars(j, j + 1, 'green');
            }
            resetBarColors();
        }
    }
    sorting = false;
}

async function insertionSort() {
    sorting = true;
    for (let i = 1; i < array.length && sorting; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key && sorting) {
            highlightBars(j, j + 1, 'green');
            await new Promise(resolve => setTimeout(resolve, speed));
            await swap(j, j + 1);
            j--;
        }
        array[j + 1] = key;
        for (let k = 0; k < i; k++) {
            highlightBar(k, 'yellow');
        }
        resetBarColors();
    }
    sorting = false;
}

async function mergeSort() {
    sorting = true;
    await mergeSortHelper(0, array.length - 1);
    sorting = false;
}

async function mergeSortHelper(start, end) {
    if (start < end && sorting) {
        const mid = Math.floor((start + end) / 2);
        await mergeSortHelper(start, mid);
        await mergeSortHelper(mid + 1, end);
        await merge(start, mid, end);
    }
}

async function merge(start, mid, end) {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length && sorting) {
        highlightBars(k, k, 'green');
        renderArray();
        await new Promise(resolve => setTimeout(resolve, speed));
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        k++;
        renderArray();
    }

    while (i < left.length && sorting) {
        array[k] = left[i];
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    while (j < right.length && sorting) {
        array[k] = right[j];
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    for (let m = start; m <= end; m++) {
        highlightBar(m, 'yellow');
    }
    renderArray();
}

async function swap(indexA, indexB) {
    const temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
    renderArray();
    highlightBars(indexA, indexB, 'red');
    await new Promise(resolve => setTimeout(resolve, speed));
}

function highlightBars(indexA, indexB, color) {
    const bars = document.querySelectorAll('.bar');
    bars[indexA].style.backgroundColor = color;
    bars[indexB].style.backgroundColor = color;
}

function highlightBar(index, color) {
    const bars = document.querySelectorAll('.bar');
    bars[index].style.backgroundColor = color;
}

function resetBarColors() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.backgroundColor = '#3498db';
    });
}

document.getElementById('reset-button').addEventListener('click', () => {
    sorting = false;
    generateArray();
});

generateArray();
