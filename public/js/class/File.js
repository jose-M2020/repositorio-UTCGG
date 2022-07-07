import { createHTML } from '../helpers.js';

export default class File {
    constructor(dropZone, selectedFilesContainer, config){
        this.dropZone = this._getElement(dropZone);
        this.fileInput = this._getElement(dropZone + ' input[type="file"]');
        this.selectedFilesContainer = this._getElement(selectedFilesContainer);
        this.validExtensions = [];
        this.config = {
            canDropFiles: true,
            validExtensions: [],
            fileSize: 1e+7,
            numberFiles: 10,
            ...config
        };
        this.base64Files = [];
        this.files =  new DataTransfer();

        this.listenEvents();
    }

    listenEvents(){
        if(this.fileInput){
            this._handleFile();
    
            if(this.config.canDropFiles){
                this._onDragEnter();
                this._onDragLeave();
                this._onDrop();
            }
        } else{
            console.error('File input not selected');
        }
    }

    _handleFile() {
        if (this.fileInput) {
            this.fileInput.addEventListener("change", event => {
                const { target: {files} } = event;

                for (const file of files) {
                    if(!this._validate(file)) continue;
                    // console.log('Files valid: ', file)

                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    
                    fileReader.onloadend = () => {
                      const isImage = file.type.match('image.*');
                      const tempImage = fileReader.result;
                      
                      file.id = 'id' + Math.ceil(Math.random()*1000000000);
                      
                      //   if(isImage){
                      //     this.base64Files.push(tempImage);
                      //   }
                          
                      this._addElement(file, isImage, tempImage);
                      this._addFile(file);
                    };                    
                }

                setTimeout(() =>{
                    console.log(this.files)
                    this.fileInput.files = this.files.files;
                    console.log(this.fileInput.files)
                },50)
            });
        }
    }

    _onDragLeave() {
        this.fileInput.addEventListener('dragleave', event => {
            this.dropZone.style.backgroundColor = '';
        });
    }
    
    _onDragEnter() {
        this.fileInput.addEventListener('dragenter', event => {
            // const target = validateTarget(event.target);
            this.dropZone.style.backgroundColor = '#eaeaea';
        });
    }

    _onDrop() {
        this.fileInput.addEventListener('drop', event => {
            this.dropZone.style.backgroundColor = '';
        });
    }

    _addFile(file){
        this.files.items.add(file);
    }

    _removeFile(id) {
        for(const key in this.files.files) {
            if(this.files.items[key].getAsFile().id === id) {
                this.files.items.remove(key);
				break;
            }
        }
        
        this.fileInput.files = this.files.files;
        // this.base64Files.splice(index, 1);
    }

    _addElement(fileData, isImage = false, tempImage = null) {
        const fileContainerClass = 'file-item';
        const fileContainerId = fileData.id;
        let element;

        if(isImage) {
          element = createHTML([
            {
              type: 'div',
              attributes: { class: `${fileContainerClass} position-relative`, id: fileContainerId}
            },
            {
              type: 'img',
              attributes: { src: tempImage, title: fileData.name }
            },
            {
              type: 'i',
              isChild: false,
              attributes: { class: 'file-remove fas fa-times-circle' }
            },
            // {
            //   type: 'span',
            //   isChild: false,
            //   data: fileData.name
            // }
          ]);
        }else{
            element = createHTML([
              {
                type: 'div',
                attributes: { class: `${fileContainerClass} d-flex position-relative`, id: fileContainerId}
              },
              {
                type: 'span',
                attributes: { class: 'file-name' },
                data: fileData.name,
                icon: { class: `fa-solid fa-file fs-3`}
              },
              {
                type: 'select',
                isChild: false,
                attributes: { class: 'file-type form-select ms-auto', name: 'type-file[]' },
                data: 'Tipo de documento',
                options: {
                    documentacion: 'Documentación',
                    proyecto: 'Proyecto desarrollado',
                    otro: 'Otro',
                }
              },
              {
                type: 'i',
                isChild: false,
                attributes: { class: 'file-remove fas fa-times-circle' }
              }
            ]);
        }

        this.selectedFilesContainer.appendChild(element);

        const deleteIcon = this._getElement(`#${fileContainerId} .file-remove`);
        
        this._removeElement(deleteIcon, fileContainerClass);
    }

    _removeElement(element, containerClass) {
        element.addEventListener('click', event => {
            const container = event.target.closest('.' + containerClass);
            this._removeFile(container.id);
            container.remove();
        })
    }

    _validate(file) {
        let errors = [];

        if(file.size === 0 || file.size > this.config.fileSize){
            errors.push('Size not valid');
        }
        if(this.config.validExtensions.length > 0){
            const fileExtension = file.name.split('.').pop();
            const isValid = this.config.validExtensions.find(ext => ext === fileExtension);
            
            !isValid ? errors.push('Extension not valid') : '';
        }
        if(errors.length > 0 || this.files.files.length === this.config.numberFiles){
            return false;
        }
        return true
    }

    _getElement(name) {
        const element = document.querySelector(name);
        return element;
    }

    _getFileExtension(fileName){
        return fileName.match(/\.[0-9a-z]+$/i)[0];
    }
}
