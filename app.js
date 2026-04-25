document.addEventListener('DOMContentLoaded', () => {
    initDragAndDrop();
});

function initDragAndDrop() {
    const badges = document.querySelectorAll('.badge');
    const dropZones = document.querySelectorAll('.badge-grid, .assignment-box');

    // 드래그 시작 시 효과
    badges.forEach(badge => {
        badge.setAttribute('draggable', 'true');
        
        badge.addEventListener('dragstart', (e) => {
            badge.classList.add('dragging');
            // 드래그 중인 요소를 식별하기 위해 임시 ID 부여
            badge.id = 'temp-drag-item';
            e.dataTransfer.setData('text/plain', ''); // Firefox compatible
        });

        badge.addEventListener('dragend', () => {
            badge.classList.remove('dragging');
            badge.removeAttribute('id');
        });
    });

    // 드롭 대상 영역 설정 (배정 칸 및 원래 명단 칸)
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            const draggingElement = document.getElementById('temp-drag-item');
            if (draggingElement) {
                // 요소를 새로운 위치로 이동
                zone.appendChild(draggingElement);
                
                // 애니메이션 효과
                draggingElement.style.animation = 'none';
                void draggingElement.offsetWidth; // trigger reflow
                draggingElement.style.animation = 'dropPulse 0.3s ease-out';
            }
        });
    });
}

// 날짜 변경 기능 (시뮬레이션)
let currentDate = new Date(2025, 6, 9); // 2025년 7월 9일

function changeDate(days) {
    currentDate.setDate(currentDate.getDate() + days);
    updateDisplayDate();
}

function updateDisplayDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
    const dateStr = currentDate.toLocaleDateString('ko-KR', options);
    
    const displayElement = document.getElementById('display-date-text');
    if (displayElement) {
        displayElement.innerText = dateStr;
    }
    
    const subDisplayElement = document.getElementById('current-date-display');
    if (subDisplayElement) {
        subDisplayElement.innerText = `${dateStr} 기준`;
    }

    // 데이터가 변경된 것처럼 보이게 하기 위해 숫자를 조금씩 바꿔봅니다.
    simulateDataChange();
}

function simulateDataChange() {
    const counts = document.querySelectorAll('.summary-card .counts b');
    counts.forEach(b => {
        const currentVal = parseInt(b.innerText);
        const change = Math.floor(Math.random() * 5) - 2; // -2 ~ +2
        const newVal = Math.max(0, currentVal + change);
        b.innerText = newVal;
        
        // 깜빡임 효과
        b.style.transition = 'color 0.3s';
        const originalColor = b.style.color;
        b.style.color = '#10b981';
        setTimeout(() => b.style.color = originalColor, 500);
    });
}
