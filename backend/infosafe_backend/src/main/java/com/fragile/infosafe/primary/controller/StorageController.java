package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.service.StorageService;
import com.sun.mail.iap.ByteArray;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("api/storage")
public class StorageController {

    private StorageService service = new StorageService();

    @PostMapping("/upload/{dsid}")
    public ResponseEntity<String> uploadFile(@RequestParam(value = "file") MultipartFile file, @PathVariable String dsid) throws IOException {
        return new ResponseEntity<>(service.uploadFile(file, dsid), HttpStatus.OK);
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName){
        byte[] data = service.dowloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }

    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName){
        return new ResponseEntity<>(service.deleteFile(fileName), HttpStatus.OK);
    }

    @GetMapping("/list")
    public List<String> getAllFileNames(){//@RequestParam String bucketName) {
        return service.getAllFileNames();
    }
}
