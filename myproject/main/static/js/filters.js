class ProductFilters {
    constructor() {
        this.allProducts = [];
        this.filteredProducts = [];
        this.filters = {
            price: { min: 0, max: 10000 },
            sizes: [],
            lengths: [],
            clothing_styles: [],
            colors: [],
            stretchiness: [],
            materials: []
        };

        this.init();
    }

    init() {
        this.setupToggleButtons();
        this.loadProductsFromDOM();
        this.setupPriceSliders();
        this.setupSizeFilters();
        this.setupCheckboxFilters();
        this.setupCollapseButtons();
        this.updateFilterCounts();
    }

    setupToggleButtons() {
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterContent = e.target.parentNode.nextElementSibling;
                const isVisible = filterContent.style.display !== 'none';

                filterContent.style.display = isVisible ? 'none' : 'block';
                e.target.textContent = isVisible ? '+' : '-';
            });
        });
    }

    setupPriceSliders() {
        const minSlider = document.getElementById('priceSliderMin');
        const maxSlider = document.getElementById('priceSliderMax');
        const minDisplay = document.getElementById('priceMin');
        const maxDisplay = document.getElementById('priceMax');

        if (!minSlider || !maxSlider) return;

        const prices = this.allProducts.map(p => p.price).filter(p => p > 0);
        if (prices.length > 0) {
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            minSlider.min = minPrice;
            minSlider.max = maxPrice;
            maxSlider.min = minPrice;
            maxSlider.max = maxPrice;
            minSlider.value = minPrice;
            maxSlider.value = maxPrice;

            this.filters.price.min = minPrice;
            this.filters.price.max = maxPrice;

            minDisplay.textContent = minPrice;
            maxDisplay.textContent = maxPrice;
        }

        const updatePriceDisplay = () => {
            const minVal = parseInt(minSlider.value);
            const maxVal = parseInt(maxSlider.value);

            if (minVal >= maxVal) minSlider.value = maxVal - 100;
            if (maxVal <= minVal) maxSlider.value = minVal + 100;

            this.filters.price.min = parseInt(minSlider.value);
            this.filters.price.max = parseInt(maxSlider.value);

            minDisplay.textContent = minSlider.value;
            maxDisplay.textContent = maxSlider.value;

            this.applyFilters();
        };

        minSlider.addEventListener('input', updatePriceDisplay);
        maxSlider.addEventListener('input', updatePriceDisplay);
    }

    setupSizeFilters() {
        const sizeBtns = document.querySelectorAll('.size-btn[data-size]');
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const size = e.target.getAttribute('data-size');
                e.target.classList.toggle('active');

                if (this.filters.sizes.includes(size)) {
                    this.filters.sizes = this.filters.sizes.filter(s => s !== size);
                } else {
                    this.filters.sizes.push(size);
                }

                this.applyFilters();
            });
        });

        const lengthBtns = document.querySelectorAll('.size-btn[data-length]');
        lengthBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const length = e.target.getAttribute('data-length');
                e.target.classList.toggle('active');

                if (this.filters.lengths.includes(length)) {
                    this.filters.lengths = this.filters.lengths.filter(l => l !== length);
                } else {
                    this.filters.lengths.push(length);
                }

                this.applyFilters();
            });
        });
    }

    setupCheckboxFilters() {
        // Загальний вид товару
        const clothingStyleBlock = document.querySelector('.filter-block:nth-child(4)');
        if (clothingStyleBlock) {
            clothingStyleBlock.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                        this.filters.clothing_styles.push(value);
                    } else {
                        this.filters.clothing_styles = this.filters.clothing_styles.filter(s => s !== value);
                    }
                    this.applyFilters();
                });
            });
        }

        // Кольори
        const colorBlock = document.querySelector('.filter-block:nth-child(5)');
        if (colorBlock) {
            colorBlock.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const label = checkbox.parentNode.textContent;
                    const colorName = label.split(' (')[0];
                    if (e.target.checked) {
                        this.filters.colors.push(colorName);
                    } else {
                        this.filters.colors = this.filters.colors.filter(c => c !== colorName);
                    }
                    this.applyFilters();
                });
            });
        }

        const stretchBlock = document.querySelector('.filter-block:nth-child(6)');
        if (stretchBlock) {
            stretchBlock.addEventListener('change', (e) => {
                if (e.target.matches('input[type="checkbox"]')) {
                    const value = e.target.value;
                    console.log('Клікнули на чекбокс розтяжності:', value);

                    if (!this.filters) {
                        console.error('⚠ this.filters не знайдено!', this);
                        return;
                    }

                    if (e.target.checked) {
                        this.filters.stretchiness.push(value);
                        console.log(`✅ Додано: ${value}`, this.filters.stretchiness);
                    } else {
                        this.filters.stretchiness = this.filters.stretchiness.filter(s => s !== value);
                        console.log(`❌ Видалено: ${value}`, this.filters.stretchiness);
                    }

                    if (typeof this.applyFilters === 'function') {
                        console.log('Викликаємо applyFilters()');
                        this.applyFilters();
                    }
                }
            });
        }

        // Матеріали
        const materialBlock = document.querySelector('.filter-block:nth-child(7)');
        if (materialBlock) {
            materialBlock.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const label = checkbox.parentNode.textContent;
                    const materialName = label.split(' (')[0];
                    if (e.target.checked) {
                        this.filters.materials.push(materialName);
                    } else {
                        this.filters.materials = this.filters.materials.filter(m => m !== materialName);
                    }
                    this.applyFilters();
                });
            });
        }
    }

    setupCollapseButtons() {
        document.querySelectorAll('.collapse-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterContent = e.target.closest('.filter-content');
                const toggleBtn = filterContent.previousElementSibling.querySelector('.toggle-btn');
                filterContent.style.display = 'none';
                toggleBtn.textContent = '+';
            });
        });
    }

    loadProductsFromDOM() {
        const productElements = document.querySelectorAll('.product-item');
        this.allProducts = [];

        productElements.forEach(el => {
            const product = {
                element: el,
                price: parseFloat(el.getAttribute('data-price')) || 0,
                size: el.getAttribute('data-size') || '',
                color: el.getAttribute('data-color') || '',
                material: el.getAttribute('data-material') || '',
                name: el.querySelector('.product-name')?.textContent || '',
                clothing_style: this.extractClothingStyle(el),
                stretchiness: this.extractStretchiness(el),
                sizes: this.extractSizes(el),
                lengths: this.extractLengths(el)
            };
            this.allProducts.push(product);
        });

        this.filteredProducts = [...this.allProducts];
    }

    extractClothingStyle(element) {
        const attrStyle = element.getAttribute('data-clothing-style');
        if (attrStyle) return attrStyle;
        const name = element.querySelector('.product-name')?.textContent.toLowerCase() || '';
        if (name.includes('прям')) return 'Прямий';
        if (name.includes('вільн')) return 'Вільний';
        if (name.includes('оверсайз') || name.includes('мішков')) return 'Оверсайз';
        if (name.includes('класичн')) return 'Класичний';
        if (name.includes('спортив')) return 'Спортивний';
        if (name.includes('повсякд') || name.includes('casual')) return 'Casual';
        if (name.includes('елегант')) return 'Елегантний';
        return 'Інший';
    }

    extractStretchiness(element) {
        const attrStretch = element.getAttribute('data-stretchiness');
        if (attrStretch) return attrStretch;
        const name = element.querySelector('.product-name')?.textContent.toLowerCase() || '';
        const material = element.getAttribute('data-material')?.toLowerCase() || '';
        if (name.includes('еластан') || name.includes('лайкра') || material.includes('еластан') || material.includes('лайкра')) {
            return 'Висока';
        }
        if (name.includes('бавовн') || name.includes('льон') || material.includes('бавовн') || material.includes('льон')) {
            return 'Низька';
        }
        if (name.includes('джинс') || name.includes('поліестер') || material.includes('джинс') || material.includes('поліестер')) {
            return 'Середня';
        }
        return 'Середня';
    }

    extractSizes(element) {
        return [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
    }

    extractLengths(element) {
        return [29, 30, 31, 32, 33, 34];
    }

    applyFilters() {
        this.filteredProducts = this.allProducts.filter(product => {
            if (product.price < this.filters.price.min || product.price > this.filters.price.max) return false;
            if (this.filters.sizes.length > 0) {
                const hasSize = this.filters.sizes.some(size => product.sizes.includes(parseInt(size)));
                if (!hasSize) return false;
            }
            if (this.filters.lengths.length > 0) {
                const hasLength = this.filters.lengths.some(length => product.lengths.includes(parseInt(length)));
                if (!hasLength) return false;
            }
            if (this.filters.clothing_styles.length > 0) {
                if (!this.filters.clothing_styles.includes(product.clothing_style)) return false;
            }
            if (this.filters.colors.length > 0) {
                const productColor = product.color || this.extractColorFromName(product.name);
                if (!this.filters.colors.some(color => productColor.includes(color))) return false;
            }
            if (this.filters.stretchiness.length > 0) {
                if (!this.filters.stretchiness.includes(product.stretchiness)) return false;
            }
            if (this.filters.materials.length > 0) {
                const productMaterial = product.material || this.extractMaterialFromName(product.name);
                if (!this.filters.materials.some(material => productMaterial.includes(material))) return false;
            }
            return true;
        });

        this.displayProducts();
        this.updateFilterCounts();
    }

    extractColorFromName(name) {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('чорн')) return 'Чорний';
        if (lowerName.includes('сір')) return 'Сірий';
        if (lowerName.includes('блакитн') || lowerName.includes('син')) return 'Блакитний';
        if (lowerName.includes('рожев')) return 'Рожевий';
        if (lowerName.includes('фіолетов')) return 'Фіолетовий';
        if (lowerName.includes('червон')) return 'Червоний';
        if (lowerName.includes('жовт')) return 'Жовтий';
        if (lowerName.includes('зелен')) return 'Зелений';
        if (lowerName.includes('беж')) return 'Бежавий';
        if (lowerName.includes('біл')) return 'Білий';
        return 'Інший';
    }

    extractMaterialFromName(name) {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('джинс')) return 'Джинс';
        if (lowerName.includes('бавовн')) return 'Бавовна';
        if (lowerName.includes('поліестер')) return 'Поліестер';
        if (lowerName.includes('еластан')) return 'Еластан';
        if (lowerName.includes('льон')) return 'Льон';
        if (lowerName.includes('віскоз')) return 'Віскоза';
        return 'Змішаний';
    }

    displayProducts() {
        this.allProducts.forEach(product => product.element.style.display = 'none');
        this.filteredProducts.forEach(product => product.element.style.display = 'block');
        this.updateNoProductsMessage();
    }

    updateNoProductsMessage() {
        let noProductsEl = document.querySelector('.no-products-filtered');
        if (this.filteredProducts.length === 0) {
            if (!noProductsEl) {
                noProductsEl = document.createElement('div');
                noProductsEl.className = 'no-products-filtered';
                noProductsEl.innerHTML = '<p>За вашими фільтрами товарів не знайдено</p>';
                document.querySelector('.products-grid').appendChild(noProductsEl);
            }
            noProductsEl.style.display = 'block';
        } else if (noProductsEl) {
            noProductsEl.style.display = 'none';
        }
    }

    updateFilterCounts() {
        const clothingStyleCounts = document.querySelectorAll('.count[data-type]');
        clothingStyleCounts.forEach(countEl => {
            const type = countEl.getAttribute('data-type');
            const count = this.allProducts.filter(p => p.clothing_style === type).length;
            countEl.textContent = count;
        });

        this.updateColorCounts();
        this.updateStretchCounts();
        this.updateMaterialCounts();
        this.updateResultsCount();
    }

    updateColorCounts() {
        const colorLabels = document.querySelectorAll('.filter-block:nth-child(5) label');
        colorLabels.forEach(label => {
            const text = label.textContent;
            const colorName = text.split(' (')[0];
            const count = this.allProducts.filter(p => {
                const productColor = p.color || this.extractColorFromName(p.name);
                return productColor.includes(colorName);
            }).length;
            label.innerHTML = label.innerHTML.replace(/\(\d+\)/, `(${count})`);
        });
    }

    updateStretchCounts() {
        const stretchLabels = document.querySelectorAll('.filter-block:nth-child(6) label');
        stretchLabels.forEach(label => {
            const checkbox = label.querySelector('input[type="checkbox"]');
            const stretchName = checkbox.value;
            const count = this.allProducts.filter(p => p.stretchiness === stretchName).length;
            label.innerHTML = `<label><input type="checkbox" value="${stretchName}" ${checkbox.checked ? 'checked' : ''}/> ${stretchName} (${count})</label>`;
        });
    }

    updateMaterialCounts() {
        const materialLabels = document.querySelectorAll('.filter-block:nth-child(7) label');
        materialLabels.forEach(label => {
            const text = label.textContent;
            const materialName = text.split(' (')[0];
            const count = this.allProducts.filter(p => {
                const productMaterial = p.material || this.extractMaterialFromName(p.name);
                return productMaterial.includes(materialName);
            }).length;
            label.innerHTML = label.innerHTML.replace(/\(\d+\)/, `(${count})`);
        });
    }

    updateResultsCount() {
        let resultCount = document.querySelector('.results-count');
        if (!resultCount) {
            resultCount = document.createElement('div');
            resultCount.className = 'results-count';
            document.querySelector('.main-content').insertBefore(resultCount, document.querySelector('.products-grid'));
        }

    }

    clearAllFilters() {
        this.filters = {
            price: { min: 0, max: 10000 },
            sizes: [],
            lengths: [],
            clothing_styles: [],
            colors: [],
            stretchiness: [],
            materials: []
        };
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('.size-btn.active').forEach(btn => btn.classList.remove('active'));

        const minSlider = document.getElementById('priceSliderMin');
        const maxSlider = document.getElementById('priceSliderMax');
        if (minSlider && maxSlider) {
            minSlider.value = minSlider.min;
            maxSlider.value = maxSlider.max;
            document.getElementById('priceMin').textContent = minSlider.min;
            document.getElementById('priceMax').textContent = maxSlider.max;
        }
        this.applyFilters();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.productFilters = new ProductFilters();
});
