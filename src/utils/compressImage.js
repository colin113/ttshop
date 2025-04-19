export function compressImage(file, maxWidth = 900, maxHeight = 900, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // 读取文件为 Data URL
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            // 加载图片
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // 计算压缩后的宽高
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height = Math.round((height *= maxWidth / width));
                        width = maxWidth;
                    } else {
                        width = Math.round((width *= maxHeight / height));
                        height = maxHeight;
                    }
                }

                // 设置 Canvas 尺寸
                canvas.width = width;
                canvas.height = height;

                // 绘制图片到 Canvas
                ctx.drawImage(img, 0, 0, width, height);

                // 导出压缩后的图片
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(new File([blob], file.name, { type: file.type }));
                        } else {
                            reject(new Error("无法生成压缩图片"));
                        }
                    },
                    file.type,
                    quality // 图片质量 (0 到 1)
                );
            };

            img.onerror = (error) => {
                reject(error);
            };
        };

        reader.onerror = (error) => {
            reject(error);
        };

        // 开始读取文件
        reader.readAsDataURL(file);
    });
}